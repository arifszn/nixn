import { publicApi } from "@/store/api";
import { apiRoutes } from "@/routes/api.route";
import { Token } from "@/interfaces/token.interface";
import { setToken } from "@/store/slices/token.slice";
import { LoggedInUser } from "@/interfaces/logged-in-user.interface";
import { setLoggedInUser } from "@/store/slices/logged-in-user.slice";

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
        const token: Token = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        const user: LoggedInUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          firstName: data.firstName,
          lastName: data.lastName,
        };
        dispatch(setToken(token));
        dispatch(setLoggedInUser(user));
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