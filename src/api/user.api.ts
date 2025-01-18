import { privateApi } from "@/store/api";
import { apiRoutes } from "../routes/api.route";
import { User } from "../interfaces/user.interface";
import { RTK_QUERY_TAG } from "../constants/rtkTags.constant";

export const userApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users with pagination
    getUsers: builder.query({
      query: ({ limit = 10, skip = 0 }) => ({
        url: apiRoutes.user,
        params: { limit, skip },
      }),
      transformResponse: (response: { users: User[]; total: number; skip: number; limit: number }) => ({
        data: response.users,
        total: response.total,
        skip: response.skip,
        limit: response.limit,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({ type: RTK_QUERY_TAG.user, id })),
              { type: RTK_QUERY_TAG.user, id: "LIST" },
            ]
          : [{ type: RTK_QUERY_TAG.user, id: "LIST" }],
    }),

    // Fetch a single user by ID
    getUserById: builder.query({
      query: (id: number) => `${apiRoutes.userById}/${id}`,
      providesTags: (_result, _error, id) => [{ type: RTK_QUERY_TAG.user, id }],
    }),

    // Create a new user
    createUser: builder.mutation({
      query: (user) => ({
        url: apiRoutes.signup,
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: RTK_QUERY_TAG.user, id: "LIST" }],
    }),

    // Update an existing user
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: RTK_QUERY_TAG.user, id }],
    }),

    // Delete a user
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: RTK_QUERY_TAG.user, id }, { type: RTK_QUERY_TAG.user, id: "LIST" }],
    }),
    
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

