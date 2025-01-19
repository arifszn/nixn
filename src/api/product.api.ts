import { privateApi } from "@/store/api";
import { apiRoutes } from "@/routes/api.route";
import { ProductResponse } from "@/interfaces/product.interface";
import { RTK_QUERY_TAG } from "@/constants/rtk-tags.constant";

export const productApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users with pagination
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0 }) => ({
        url: apiRoutes.product,
        params: { limit, skip },
      }),
      transformResponse: (response: ProductResponse) => ({
        data: response.products,
        total: response.total,
        success: true,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.product, id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
} = productApi;

