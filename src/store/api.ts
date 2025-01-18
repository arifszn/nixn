import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants/config.constant';
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
    const payload = action?.payload as { data: { message: string }, status: number };
    const errorMessage = payload?.data?.message;
    if (payload?.status === 400) {
      showNotification('Invalid Input', NotificationType.ERROR, errorMessage || 'The values you entered are invalid');
    } else {
      showNotification('Error', NotificationType.ERROR, errorMessage || 'An unexpected error occurred');
    }
  }

  return next(action);
};
