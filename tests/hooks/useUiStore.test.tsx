import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useUiStore } from '../../src/hooks/useUiStore';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, UiState } from '../../src/store';
import { act } from '@testing-library/react';

const getMockStore = (initialState: UiState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('Testing useUiStore', () => {
  test('should return defualt values', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test('should set isDateModalOpen in true', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { openDateModal } = result.current;
    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('should set isDateModalOpen in false', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { closeDateModal } = result.current;
    act(() => closeDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test('should set isDateModalOpen to the oposite value', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => result.current.toggleDateModal());
    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => result.current.toggleDateModal());
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
