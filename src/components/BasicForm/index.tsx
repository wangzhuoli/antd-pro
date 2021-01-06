import React from 'react';
import { Form, Button, Space } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 10 },
};

type BasicFormProps = {
  getRequest?: () => Promise<any>;
  updateRequest?: () => Promise<any>;
  createRequest?: () => Promise<any>;
  id?: string | number;
};

const BasicForm: React.FC<BasicFormProps> = (props) => {
  const { getRequest, updateRequest, createRequest, id, children, ...rest } = props;
  return (
    <Form {...layout} name="basic" {...rest}>
      {children}
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            {id ? '修改' : '添加'}
          </Button>
          <Button>返回</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default BasicForm;
