import React from 'react';
import { getStaffsList } from '@/services/staffs';
import BasicTable from '@/components/BasicTable';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';

export type TableListItem = {
  username: string;
  avatar?: string;
  'account.login_count': string;
  'account.last_login_ip': string;
  'account.last_login_time': string;
  realname: string;
  status: 0 | -1;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
  },
  {
    title: '登录次数',
    dataIndex: 'account.login_count',
  },
  {
    title: '上次登录ip',
    dataIndex: 'account.last_login_ip',
  },
  {
    title: '上次登录时间',
    dataIndex: 'account.last_login_time',
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    dataIndex: 'id',
    render: () => {
      return (
        <React.Fragment>
          <Button type="primary" key="edit">
            编辑
          </Button>
          <Button type="text" danger key="del">
            删除
          </Button>
        </React.Fragment>
      );
    },
  },
];

export default () => {
  return (
    <div>
      <BasicTable request={getStaffsList} columns={columns} />
    </div>
  );
};
