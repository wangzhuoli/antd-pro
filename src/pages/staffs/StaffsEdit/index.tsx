import React, { useState } from 'react';
import { Input, Select, Form, Switch } from 'antd';
import BasicForm from '@/components/BasicForm';
import { useMount, useRequest } from 'ahooks';
import ContentWrapper from '@/components/ContentWrapper';
import { getAllRolesList } from '@/services/system';

const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  role: [{ required: true, message: '请选择权限' }],
  password: [{ required: true, message: '请填写登陆密码' }],
  realname: [{ required: true, message: '请填写用户真实姓名' }],
  status: [{ required: true, message: '请选择用户状态' }],
};

const formatResult = (data: any) => {
  return data?.data?.result || [];
};

type RoleItem = {
  name: string;
  id: number;
};

export default () => {
  const { data = [], run } = useRequest(getAllRolesList, { formatResult });

  useMount(() => {
    run();
  });
  return (
    <ContentWrapper>
      <BasicForm>
        <Form.Item label="会员名称" name="usename" rules={rules.username}>
          <Input />
        </Form.Item>
        <Form.Item label="真实姓名" name="realname" rules={rules.realname}>
          <Input />
        </Form.Item>
        <Form.Item label="会员角色" name="role" rules={rules.role}>
          <Select>
            {data.map((item: RoleItem) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="登陆密码" name="password" rules={rules.password}>
          <Input type="password" />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={rules.status} valuePropName="checked">
          <Switch />
        </Form.Item>
      </BasicForm>
    </ContentWrapper>
  );
};
