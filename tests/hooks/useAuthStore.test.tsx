import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';

import { authSlice, AuthState } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { act, waitFor } from '@testing-library/react';
import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../src/api/calendarApi';

const getMockStore = (initialState: AuthState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Testing useAuthStore', () => {
  beforeEach(() => localStorage.clear());

  test('should return the default values', () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      status: 'checking',
      user: undefined,
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('should login correctly', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { email, password, name, uid } = testUserCredentials;
    await act(async () => await result.current.startLogin(email, password));

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        name,
        uid,
      },
    });
    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('should fail when login', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => await result.current.startLogin('wrong@email.com', 'badpassword'));
    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: expect.any(String),
      user: undefined,
      status: 'not-authenticated',
    });
    expect(localStorage.getItem('token')).toBe(null);

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test('should create a new user', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const spy = jest.spyOn(calendarApi, 'post').mockResolvedValue({
      data: {
        ok: true,
        uid: '123abc',
        name: 'New user',
        token: 'dlcldjnfjnladakcdanc',
      },
    });

    await act(
      async () => await result.current.startRegister('New user', 'new-user@email.com', 'password')
    );
    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { uid: '123abc', name: 'New user' },
      status: 'authenticated',
    });

    spy.mockRestore();
  });

  test('should fail when creating a user', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { email, password, name } = testUserCredentials;
    await act(async () => await result.current.startRegister(name, email, password));

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: expect.any(String),
      user: undefined,
      status: 'not-authenticated',
    });
  });

  test('should fail token does not exist', async () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => await result.current.checkAuthToken());
    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: undefined,
      status: 'not-authenticated',
    });
  });

  test('should authenticate the user when token exists', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => await result.current.checkAuthToken());
    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: {
        uid: testUserCredentials.uid,
        name: testUserCredentials.name,
      },
      status: 'authenticated',
    });
  });
});
