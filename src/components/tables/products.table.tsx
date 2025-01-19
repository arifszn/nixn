import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Product, ProductCategory } from '@/interfaces/product.interface';
import { ActionButton } from '@/components/ui/action-button';
import { productApi, useGetProductsCategoryQuery } from '@/api/product.api';
import { useAppDispatch } from '@/hooks/redux.hook';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Archive, Ellipsis, Eye, Pencil, Trash } from 'lucide-react';
import { RTK_QUERY_TAG } from '@/constants/rtk-tags.constant';
import { Button } from '../ui/button';
import DataTable, { DataTableProps } from '../data-table';

type SortOrder = 'descend' | 'ascend' | null;

const ProductActions = ({
  row,
  onView,
  onEdit,
  onDelete,
  onArchive,
}: {
  row: Product;
  onView: (row: Product) => void;
  onEdit: (row: Product) => void;
  onDelete: (row: Product) => void;
  onArchive: (row: Product) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open menu"
          variant="ghost"
          className="size-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuItem
          className="cursor-pointer text-xs"
          onClick={() => onView(row)}
        >
          <Eye className="mr-2 h-3 w-3" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-xs"
          onClick={() => onEdit(row)}
        >
          <Pencil className="mr-2 h-3 w-3" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-xs"
          onClick={() => onDelete(row)}
        >
          <Trash className="mr-2 h-3 w-3 text-destructive" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-xs"
          onClick={() => onArchive(row)}
        >
          <Archive className="mr-2 h-3 w-3" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProductsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { data: productsCategory } = useGetProductsCategoryQuery({});

  const invalidateProductTags = () => {
    dispatch(
      productApi.util.invalidateTags([
        { type: RTK_QUERY_TAG.product, id: 'LIST' },
      ]),
    );
  };

  const fetchData: DataTableProps<Product>['fetchData'] = async (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
      category?: string;
    },
    sort: Record<string, SortOrder>,
  ) => {
    try {
      const {
        current = 1,
        pageSize = 10,
        keyword = '',
        category = '',
      } = params;
      const order = sort[Object.keys(sort)[0]];
      const { data, error } = await dispatch(
        category
          ? productApi.endpoints.getProductsByCategory.initiate({
              limit: pageSize,
              skip: (current - 1) * pageSize,
              sortBy: Object.keys(sort)[0],
              order: order === 'descend' ? 'desc' : 'asc',
              category,
            })
          : productApi.endpoints.getProducts.initiate({
              limit: pageSize,
              skip: (current - 1) * pageSize,
              search: keyword,
              sortBy: Object.keys(sort)[0],
              order: order === 'descend' ? 'desc' : 'asc',
            }),
      );

      if (error) {
        throw error;
      }

      return {
        data: data?.data || [],
        total: data?.total || 0,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return { data: [], total: 0, success: false };
    }
  };

  const columns: DataTableProps<Product>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true,
      search: false,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'left',
      sorter: false,
      search: false,
      width: 300,
      render: (_, record: Product) => (
        <div className="flex items-center gap-2">
          <Avatar className="bg-gray-100 h-8 w-8">
            <AvatarImage src={record.thumbnail} alt={record.title} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {record.title}
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      align: 'center',
      search: false,
      render: (_, record: Product) => `$${record.price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: false,
      align: 'center',
      render: (_, record: Product) => (
        <Badge variant="outline" className="font-mono font-light">
          {record.category}
        </Badge>
      ),
      valueType: 'select',
      valueEnum: productsCategory?.data.reduce(
        (acc: { [key: string]: { text: string } }, curr: ProductCategory) => {
          acc[curr] = { text: curr };
          return acc;
        },
        {} as { [key: string]: { text: string } },
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: false,
      align: 'center',
      search: false,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      sorter: false,
      align: 'center',
      search: false,
      render: (_, record: Product) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {record.tags.map((tag: string) => (
            <Badge variant="outline" key={tag} className="font-mono font-light">
              {tag}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: true,
      align: 'center',
      search: false,
    },
    {
      title: 'Availability',
      dataIndex: 'availabilityStatus',
      sorter: true,
      align: 'center',
      search: false,
      render: (_, record: Product) => (
        <Badge
          variant={
            record.availabilityStatus !== 'In Stock' ? 'destructive' : undefined
          }
          className="font-mono font-light text-xs"
        >
          {record.availabilityStatus}
        </Badge>
      ),
    },
  ];

  const actions = (row: Product) => {
    return (
      <ProductActions
        key={`actions-${row.id}`}
        row={row}
        onView={(product) => {
          console.log('View product:', product);
        }}
        onEdit={(product) => {
          console.log('Edit product:', product);
        }}
        onDelete={(product) => {
          console.log('Delete product:', product);
        }}
        onArchive={(product) => {
          console.log('Archive product:', product);
        }}
      />
    );
  };

  return (
    <DataTable
      columns={columns}
      actions={actions}
      fetchData={fetchData}
      rowKey="id"
      reloadCallback={invalidateProductTags}
      filterType="light"
      defaultPageSize={20}
      tableAlertOptionRender={({ selectedRows }) => (
        <div>
          <ActionButton onClick={() => console.log(selectedRows)}>
            Batch Deletion
          </ActionButton>
        </div>
      )}
      expandedRowRender={(record) => (
        <div className="p-4 bg-white shadow rounded-lg">
          {record.description}
        </div>
      )}
    />
  );
};

export default ProductsTable;
