export interface BackendResponseError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}
