import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: object;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCheckingAuth: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<AuthState['user']>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
  },
});

export const { onCheckingAuth, onLogin } = authSlice.actions;
