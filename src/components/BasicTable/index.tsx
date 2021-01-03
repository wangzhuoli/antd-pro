import { Table, Form } from 'antd';
import { useAntdTable } from 'ahooks';
import React, { useMemo } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import type { PaginatedParams } from 'ahooks/lib/useAntdTable';
import type { ProColumns } from '@ant-design/pro-table';
import useUrlState from '@ahooksjs/use-url-state';

export type BasicTableProps = {
  request: any;
  size?: number;
  columns: any;
};

const tableRequest = (request: any, setUrlState: any) => (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<any> => {
  const search = {
    page: current,
    size: pageSize,
    ...formData,
  };
  const query = { ...search };
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) {
      delete query[k];
    }
  });
  setUrlState(query);
  return request(search)
    .then((res: any) => {
      const { data } = res;
      return {
        total: data.total,
        list: data.items || data.result,
      };
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const BasicTable: React.FC<BasicTableProps> = (props) => {
  const [form] = Form.useForm();
  const { request, size = 10, columns } = props;
  const [urlState, setUrlState] = useUrlState();
  const getTableData = useMemo(() => tableRequest(request, setUrlState), []);
  const current = Number(urlState.page || 1);
  const pageSize = Number(urlState.size || size);
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: size,
    form,
    defaultParams: [{ current, pageSize }],
  });
  const { type, changeType, submit, reset } = search;
  return (
    <React.Fragment>
      <Table columns={columns} bordered rowKey={({ id }) => id} {...tableProps} />
    </React.Fragment>
  );
};

export default BasicTable;
