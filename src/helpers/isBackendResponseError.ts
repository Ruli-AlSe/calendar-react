import { BackendResponseError } from '../interfaces';

export const isBackendResponseError = (error: unknown): error is BackendResponseError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as BackendResponseError).response?.data?.message === 'string'
  );
};
