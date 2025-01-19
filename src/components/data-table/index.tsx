import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
} from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUSIntl from 'antd/locale/en_US';
import { DatabaseZap } from 'lucide-react';
import { useRef } from 'react';

type SortOrder = 'descend' | 'ascend' | null;

type FilterType = 'light' | 'query';

export interface DataTableProps<T> {
  columns: ProColumns<T>[];
  fetchData: (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
  ) => Promise<RequestData<T>>;
  rowKey: string;
  actions?: (row: T) => JSX.Element;
  defaultPageSize?: number;
  reloadCallback?: () => void;
  filterType?: FilterType;
  tableAlertOptionRender?: (props: { selectedRows: T[] }) => JSX.Element;
  expandedRowRender?: (record: T) => JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({
  columns,
  fetchData,
  rowKey,
  actions,
  defaultPageSize = 10,
  reloadCallback,
  filterType = 'light',
  tableAlertOptionRender,
  expandedRowRender,
}: DataTableProps<T>): JSX.Element => {
  const actionRef = useRef<ActionType>();

  const extendedColumns: ProColumns<T>[] = actions
    ? [
        ...columns,
        {
          title: 'Action',
          align: 'center',
          key: 'option',
          fixed: 'right',
          width: 100,
          search: false,
          render: (_, row) => actions(row),
        } as ProColumns<T>,
      ]
    : columns;

  return (
    <ConfigProvider
      locale={enUSIntl}
      theme={{
        token: {
          colorPrimary: 'var(--primary-color)',
          fontSize: 12,
          fontFamily: 'Geist',
        },
      }}
    >
      <ProTable
        columns={extendedColumns}
        expandable={{
          expandedRowRender: expandedRowRender,
        }}
        request={fetchData}
        rowKey={rowKey}
        actionRef={actionRef}
        cardBordered={false}
        cardProps={false}
        rowSelection={{}}
        rowClassName={(_record, index) =>
          index % 2 === 0 ? 'bg-muted' : 'bg-muted/50'
        }
        bordered
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        dateFormatter="string"
        pagination={{
          defaultPageSize: defaultPageSize,
          showQuickJumper: true,
        }}
        search={{
          filterType: filterType,
        }}
        options={{
          search: {
            placeholder: 'Search',
          },
          reload: () => {
            reloadCallback?.();
            actionRef.current?.reload();
          },
        }}
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
        tableAlertOptionRender={tableAlertOptionRender}
        locale={{
          emptyText: (
            <div className="flex justify-center items-center h-64">
              <div className="text-center text-primary/80">
                <DatabaseZap className="mx-auto text-4xl" />
                <p className="mt-2">No Data</p>
              </div>
            </div>
          ),
        }}
      />
    </ConfigProvider>
  );
};

export default DataTable;
