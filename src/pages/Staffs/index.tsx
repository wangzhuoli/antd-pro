import React from 'react';
import { getStaffsList, delStaffs } from '@/services/staffs';
import BasicTable from '@/components/BasicTable';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Badge, Form, Input } from 'antd';
import DelPopconfirm from '@/components/DelPopconfirm';
import { membert_status } from '@/utils/constants';
import BasicImg from '@/components/BasicImg';

export type TableListItem = {
  username: string;
  avatar?: string;
  realname: string;
  status: 0 | -1;
};

type AccountParams = {
  login_count: string;
  last_login_time: string;
  last_login_ip: string;
};

const handleAdd = () => {};

const beforeNode = (
  <Button type="primary" onClick={handleAdd}>
    添加
  </Button>
);

const simpleNode = (
  <Form.Item name="username">
    <Input placeholder="用户名" allowClear />
  </Form.Item>
);

export default () => {
  const [form] = Form.useForm();
  const handleDel = async (id: string) => {
    const { error } = await delStaffs(id);
    if (!error) {
      form.refresh();
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (text) => <BasicImg src={text} width={100} />,
    },
    {
      title: '登录次数',
      dataIndex: 'account',
      render: (text: AccountParams): React.ReactNode => text.login_count,
    },
    {
      title: '上次登录ip',
      dataIndex: 'account',
      render: (text: AccountParams) => text.last_login_ip,
    },
    {
      title: '上次登录时间',
      dataIndex: 'account',
      render: (text: AccountParams) => text.last_login_time,
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text) => <Badge text={membert_status[text]} color={text === 0 ? 'blue' : 'red'} />,
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        return (
          <React.Fragment>
            <Button type="primary" key="edit">
              编辑
            </Button>
            <DelPopconfirm onConfirm={() => handleDel(record.uid)} />
          </React.Fragment>
        );
      },
    },
  ];
  return (
    <BasicTable
      form={form}
      request={getStaffsList}
      columns={columns}
      beforeNode={beforeNode}
      simpleNode={simpleNode}
    />
  );
};
