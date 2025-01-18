import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants/config.constant';
import { RootState } from '@/store';
import { showNotification } from '@/lib/utils';
import { NotificationType } from '@/enums/notificationType.enum';
import { clearToken, setToken } from '@/store/slices/token.slice';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { RTK_QUERY_TAGS_LIST } from '@/constants/rtkTags.constant';

const privateBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.token.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh: typeof privateBaseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await privateBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const state = api.getState() as RootState;
    const refreshToken = state.token.refreshToken;

    if (!refreshToken) {
      api.dispatch(clearToken());
      return { error: { status: 401, data: { message: 'Unauthorized' } } };
    }

    const refreshResult = await privateBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefreshToken } =
        refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };

      api.dispatch(setToken({ accessToken, refreshToken: newRefreshToken }));

      // Retry the original request
      result = await privateBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearToken());
      showNotification(
        'Session expired',
        NotificationType.WARNING,
        'Your session has expired. Please log in again.',
      );
    }
  }

  return result;
};

export const privateApi = createApi({
  baseQuery: baseQueryWithRefresh,
  reducerPath: 'privateApi',
  tagTypes: RTK_QUERY_TAGS_LIST,
  endpoints: () => ({}),
});

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
    const payload = action?.payload as {
      data: { message: string };
      status: number;
    };
    const errorMessage = payload?.data?.message;
    if (payload?.status === 400) {
      showNotification(
        'Error',
        NotificationType.ERROR,
        errorMessage || 'The values you entered are invalid',
      );
    } else {
      showNotification(
        'Error',
        NotificationType.ERROR,
        errorMessage || 'An unexpected error occurred',
      );
    }
  }

  return next(action);
};
