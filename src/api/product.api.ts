import { privateApi } from '@/store/api';
import { apiRoutes } from '@/routes/api.route';
import {
  ProductCategoryResponse,
  ProductResponse,
} from '@/interfaces/product.interface';
import { RTK_QUERY_TAG } from '@/constants/rtk-tags.constant';

export const productApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with pagination, search, and sorting
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0, search, sortBy, order }) => ({
        url: !search ? apiRoutes.product : apiRoutes.searchProduct,
        params: { limit, skip, q: search, sortBy, order },
      }),
      transformResponse: (response: ProductResponse) => ({
        data: response.products,
        total: response.total,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.product, id: 'LIST' }],
    }),

    // Get all products by category with pagination, and sorting
    getProductsByCategory: builder.query({
      query: ({ limit = 10, skip = 0, sortBy, order, category }) => ({
        url: apiRoutes.productByCategory.replace(':category', category),
        params: { limit, skip, sortBy, order },
      }),
      transformResponse: (response: ProductResponse) => ({
        data: response.products,
        total: response.total,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.product, id: 'LIST' }],
    }),

    // Get products category list
    getProductsCategory: builder.query({
      query: () => apiRoutes.productCategory,
      transformResponse: (response: ProductCategoryResponse) => ({
        data: response,
        total: response.length,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.productCategory, id: 'LIST' }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductsCategoryQuery } = productApi;
