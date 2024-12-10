import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: { name: string; uid: string } | undefined;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'checking',
  user: undefined,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCheckingAuth: (state) => {
      state.status = 'checking';
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<AuthState['user']>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string>) => {
      state.status = 'not-authenticated';
      state.user = undefined;
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onCheckingAuth, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
