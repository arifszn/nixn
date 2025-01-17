import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants/root.constant';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { NotificationType } from '../enums/notificationType.enum';
import { showNotification } from '../lib/utils';

export const publicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  reducerPath: 'publicApi',
  endpoints: () => ({}),
});

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('error!', action);
    const errorMessage =
      (action?.payload as { data: { message: string } })?.data?.message ||
      'An unexpected error occurred';
    showNotification('Error', NotificationType.ERROR, errorMessage);
  }

  return next(action);
};
