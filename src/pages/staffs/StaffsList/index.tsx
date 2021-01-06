import React from 'react';
import { getStaffsList, delStaffs } from '@/services/staffs';
import BasicTable from '@/components/BasicTable';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Badge, Form, Input } from 'antd';
import DelPopconfirm from '@/components/DelPopconfirm';
import { membert_status } from '@/utils/constants';
import BasicImg from '@/components/BasicImg';
import { history } from 'umi';
import ContentWrapper from '@/components/ContentWrapper';

export type TableListItem = {
  username: string;
  avatar?: string;
  realname: string;
  status: 0 | -1;
  uid: string;
};

type AccountParams = {
  login_count: string;
  last_login_time: string;
  last_login_ip: string;
};

const handleAdd = () => {
  history.push('/staffs/add');
};

const handleEdit = (id: string) => {
  history.push(`/staffs/edit/${id}`);
};

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
      dataIndex: 'uid',
      render: (text) => {
        return (
          <React.Fragment>
            <Button type="primary" key="edit" onClick={() => handleEdit(text)}>
              编辑
            </Button>
            <DelPopconfirm onConfirm={() => handleDel(text)} />
          </React.Fragment>
        );
      },
    },
  ];
  return (
    <ContentWrapper>
      <BasicTable
        form={form}
        request={getStaffsList}
        columns={columns}
        beforeNode={beforeNode}
        simpleNode={simpleNode}
      />
    </ContentWrapper>
  );
};
