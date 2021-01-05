import React from 'react';
import { Popconfirm, Button } from 'antd';

export default (props: any) => {
  const { children, ...rest } = props;

  if (children) {
    return (
      <Popconfirm title="确认删除吗？" {...rest}>
        {children}
      </Popconfirm>
    );
  }
  return (
    <Popconfirm title="确认删除吗？" {...rest}>
      <Button type="text" danger key="del">
        删除
      </Button>
    </Popconfirm>
  );
};
