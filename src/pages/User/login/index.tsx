import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { ConnectState } from '@/models/connect';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { LoginParamsType } from '@/services/login';

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
};

export type LoginBlockProps = {
  dispatch: Dispatch;
};

const LoginBlock: React.FC<LoginBlockProps> = (props) => {
  const { dispatch } = props;
  const onSubmit = (values: LoginParamsType) => {
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };
  return (
    <div className={styles.wrapper}>
      <Form name="login_form" onFinish={onSubmit} initialValues={{ autoLogin: true }}>
        <Form.Item name="username" rules={rules.username}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input prefix={<LockOutlined />} placeholder="密码" type="password" />
        </Form.Item>
        <Form.Item name="autoLogin" valuePropName="checked">
          <Checkbox>自动登陆</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" className={styles.subBtn}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  login,
  loading,
}))(LoginBlock);
