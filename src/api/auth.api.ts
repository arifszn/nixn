import { publicApi } from "@/store/api";
import { apiRoutes } from "@/routes/api.route";
import { TokenState } from "@/interfaces/tokenState.interface";
import { setToken } from "@/store/slices/token.slice";

export const authApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: apiRoutes.login,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const token: TokenState = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
        dispatch(setToken(token));
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: apiRoutes.signup,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const token: TokenState = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
        dispatch(setToken(token));
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;