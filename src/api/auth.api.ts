import { publicApi } from "@/store/api";
import { apiRoutes } from "@/routes/api.route";
import { TokenState } from "@/interfaces/tokenState.interface";
import { setToken } from "@/store/slices/token.slice";
import { UserState } from "@/interfaces/userState.interface";
import { setUser } from "@/store/slices/user.slice";

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
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        const user: UserState = {
          id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          firstName: data.firstName,
          lastName: data.lastName,
        };
        dispatch(setToken(token));
        dispatch(setUser(user));
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: apiRoutes.signup,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;