import { Table, Form, Button } from 'antd';
import { useAntdTable } from 'ahooks';
import React, { useMemo } from 'react';
import type { PaginatedParams } from 'ahooks/lib/useAntdTable';
import useUrlState from '@ahooksjs/use-url-state';
import { useMount } from 'ahooks';
import styles from './index.less';

export type BasicTableProps = {
  request: any;
  size?: number;
  columns: any;
  form?: any;
  hasRefresh?: boolean;
  beforeNode?: React.ReactNode;
  simpleNode?: React.ReactNode;
  advanceNode?: React.ReactNode;
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
        total: data?.total,
        list: data?.items || data?.result,
      };
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const BasicTable: React.FC<BasicTableProps> = (props) => {
  const [defaultForm] = Form.useForm();
  const {
    request,
    size = 10,
    columns,
    form = defaultForm,
    simpleNode,
    advanceNode,
    beforeNode,
    hasRefresh = true,
    ...rest
  } = props;
  const [urlState, setUrlState] = useUrlState();
  const getTableData = useMemo(() => tableRequest(request, setUrlState), []);
  const current = Number(urlState.page || 1);
  const pageSize = Number(urlState.size || size);
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: size,
    form,
    defaultParams: [{ current, pageSize }, urlState],
  });
  const { type, changeType, submit, reset } = search;
  /* 表单添加刷新方法 */
  useMount(() => {
    form.refresh = submit;
  });
  /* 刷新重置表单筛选条件 */
  const handleReset = () => {
    form.resetFields();
    setUrlState({ page: 1, size });
    reset();
  };
  const searchFrom = (
    <Form form={form} className={styles.form}>
      {!!beforeNode && beforeNode}
      {!!simpleNode && simpleNode}
      {!!advanceNode && type === 'advance' && advanceNode}
      {(!!simpleNode || !!advanceNode) && (
        <Button type="primary" onClick={submit}>
          查询
        </Button>
      )}
      {hasRefresh && <Button onClick={handleReset}>刷新</Button>}

      {!!advanceNode && (
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? '展开' : '关闭'}
        </Button>
      )}
    </Form>
  );
  return (
    <React.Fragment>
      {searchFrom}
      <Table {...tableProps} {...rest} columns={columns} bordered rowKey={({ id }) => id} />
    </React.Fragment>
  );
};

export default BasicTable;
