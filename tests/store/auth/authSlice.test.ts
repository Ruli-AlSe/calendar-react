import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Testing authSlice', () => {
  test('should return initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('should perform a login', () => {
    let state = authSlice.getInitialState();
    state = authSlice.reducer(state, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      erroMessage: undefined,
    });
  });

  test('should perform a logout', () => {
    let state = authSlice.getInitialState();
    state = authSlice.reducer(state, onLogout());

    expect(state).toEqual({
      status: 'not-authenticated',
      user: undefined,
      erroMessage: undefined,
    });
  });

  test('should perform a logout with error', () => {
    const errorMessage = 'Invalid credentials';
    let state = authSlice.getInitialState();
    state = authSlice.reducer(state, onLogout(errorMessage));

    expect(state).toEqual({
      status: 'not-authenticated',
      user: undefined,
      errorMessage,
    });
  });

  test('should clear errorMessage', () => {
    const errorMessage = 'Invalid credentials';
    let state = authSlice.getInitialState();
    state = authSlice.reducer(state, onLogout(errorMessage));
    state = authSlice.reducer(state, clearErrorMessage());

    expect(state.errorMessage).toBe(undefined);
  });
});
