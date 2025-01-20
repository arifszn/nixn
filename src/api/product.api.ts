import { privateApi } from '@/store/api';
import { apiRoutes } from '@/routes/api.route';
import {
  Product,
  ProductCategoryResponse,
  ProductsResponse,
} from '@/interfaces/product.interface';
import { RTK_QUERY_TAG } from '@/constants/rtk-tags.constant';

export const productApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with pagination, search, and sorting
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0, search, sortBy, order }) => ({
        url: !search ? apiRoutes.products : apiRoutes.searchProduct,
        params: { limit, skip, q: search, sortBy, order },
      }),
      transformResponse: (response: ProductsResponse) => ({
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
      transformResponse: (response: ProductsResponse) => ({
        data: response.products,
        total: response.total,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.product, id: 'LIST' }],
    }),

    // Get products category list
    getProductsCategory: builder.query({
      query: () => apiRoutes.productCategories,
      transformResponse: (response: ProductCategoryResponse) => ({
        data: response,
        total: response.length,
      }),
      providesTags: () => [{ type: RTK_QUERY_TAG.productCategory, id: 'LIST' }],
    }),

    // Get a single product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `${apiRoutes.products}/${id}`,
      }),
      providesTags: (_result, _error, id) => [
        { type: RTK_QUERY_TAG.product, id },
      ],
      transformResponse: (response: Product) => response,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: apiRoutes.products,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: RTK_QUERY_TAG.product, id: 'LIST' }],
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `${apiRoutes.products}/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: RTK_QUERY_TAG.product, id },
        { type: RTK_QUERY_TAG.product, id: 'LIST' },
      ],
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${apiRoutes.products}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: RTK_QUERY_TAG.product, id },
        { type: RTK_QUERY_TAG.product, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsCategoryQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
