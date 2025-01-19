import { FC, useRef } from 'react';
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
} from '@ant-design/pro-components';
import { Product } from '@/interfaces/product.interface';
import { ConfigProvider } from 'antd';
import enUSIntl from 'antd/locale/en_US';
import { ActionButton } from '@/components/ui/action-button';
import { productApi } from '@/api/product.api';
import { useAppDispatch } from '@/hooks/redux.hook';

const ProductsTable: FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();

  const fetchData = async (
    params: { pageSize?: number; current?: number }
  ): Promise<RequestData<Product>> => {
    try {
      const { current = 1, pageSize = 10 } = params;
      const skip = (current - 1) * pageSize;

      const { data, error } = await dispatch(
        productApi.endpoints.getProducts.initiate({ limit: pageSize, skip })
      );
      if (error) {
        throw error;
      }

      return {
        data: data?.data || [],
        total: data?.total || 0,
        success: true,
      } as RequestData<Product>;
    } catch (error) {
      console.log(error);
      return { data: [], total: 0, success: false } as RequestData<Product>;
    }
  };

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: false,
      search: false,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'center',
      sorter: false,
      search: false,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: false,
      align: 'center',
      search: false,
    },
  ];

  return <ConfigProvider locale={enUSIntl}>
    <ProTable
        columns={columns}
        request={fetchData}
        cardBordered={false}
        cardProps={{
          subTitle: 'All Products',
          title: 'Products',
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <div>
            <span>
              Selected {selectedRowKeys.length} items
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={onCleanSelected}
              >
                <strong>Cancel Selection</strong>
              </a>
            </span>
          </div>
        )}
        tableAlertOptionRender={({ selectedRows }) => (
          <div>
            <ActionButton onClick={() => console.log(selectedRows)}>
              Batch Deletion
            </ActionButton>
          </div>
        )}
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 20,
        }}
        expandable={{
          expandedRowRender: (record: Product) => (
            <div className="p-4 bg-white shadow rounded-lg">
              {record.description}
            </div>
          ),
        }}
        actionRef={actionRef}
        dateFormatter="string"
        search={{
          filterType: 'query',
          className: 'bg-gray-100',
        }}
        rowKey="id"
        options={{
          search: true,
        }}
      /></ConfigProvider>;
};

export default ProductsTable;
