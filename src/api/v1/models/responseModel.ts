export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(
    data?: T, 
    message?: string
): ApiResponse<T> => ({
  status: 'success',
  message,
  data,
});

export const errorResponse = (message: string): ApiResponse<null> => ({
  status: 'error',
  error: message,
});