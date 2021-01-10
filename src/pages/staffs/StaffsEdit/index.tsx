import React from 'react';
import { Input, Select, Form, Radio } from 'antd';
import BasicForm from '@/components/BasicForm';
import { useMount, useRequest } from 'ahooks';
import ContentWrapper from '@/components/ContentWrapper';
import UploadImage from '@/components/UploadImage';
import { getAllRolesList } from '@/services/system';

const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  role: [{ required: true, message: '请选择权限' }],
  password: [{ required: true, message: '请填写登陆密码' }],
  realname: [{ required: true, message: '请填写用户真实姓名' }],
  status: [{ required: true, message: '请选择用户状态' }],
  avatar: [{ required: true, message: '请上传' }],
};

const formatResult = (data: any) => {
  return data?.data?.result || [];
};

type RoleItem = {
  name: string;
  id: number;
};

export default () => {
  const { data = [] } = useRequest(getAllRolesList, { formatResult });

  return (
    <ContentWrapper>
      <BasicForm initialValues={{ status: 0 }}>
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
        <Form.Item label="头像" name="avatar" rules={rules.avatar}>
          <UploadImage />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={-1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </BasicForm>
    </ContentWrapper>
  );
};
