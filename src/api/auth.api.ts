import { publicApi } from "@/store/api";
import { apiRoutes } from "@/routes/api.route";

export const authApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: apiRoutes.login,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;