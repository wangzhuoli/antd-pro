import React, { useEffect, useMemo } from 'react';
import { Form, Button, Space, message } from 'antd';
import { history } from 'umi';
import { useRequest, useLockFn } from 'ahooks';

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
  const [form] = Form.useForm();
  const { getRequest, updateRequest, createRequest, id, children, ...rest } = props;

  const { data, loading, run } = useRequest(getRequest, {
    manual: true,
    formatResult: (data) => data.data,
  });

  const saveRequest = useMemo(() => {
    if (id && updateRequest) {
      return updateRequest;
    }
    if (createRequest) {
      return createRequest;
    }
    return () => {};
  }, [updateRequest, createRequest]);

  useEffect(() => {
    if (id && getRequest) {
      run(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onFinish = useLockFn(async (value) => {
    if (id) {
      value.id = id;
    }
    const { error } = await saveRequest(value);
    if (!error) {
      message.success(id ? '修改成功' : '添加成功');
      history.goBack();
    }
  });

  return (
    <Form {...layout} name="basic" onFinish={onFinish} {...rest} form={form}>
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
