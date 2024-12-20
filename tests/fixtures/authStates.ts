import { AuthState } from '../../src/store';

export const initialState: AuthState = {
  status: 'checking',
  user: undefined,
  errorMessage: undefined,
};

export const authenticatedState: AuthState = {
  status: 'authenticated',
  user: {
    uid: 'abc',
    name: 'Carlos',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState: AuthState = {
  status: 'not-authenticated',
  user: undefined,
  errorMessage: undefined,
};
