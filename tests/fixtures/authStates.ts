export const initialState = {
  status: 'checking',
  user: undefined,
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'abc',
    name: 'Carlos',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: undefined,
  errorMessage: undefined,
};
