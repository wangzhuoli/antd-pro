import React from 'react';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (props: any) => {
  const { children } = props;
  return (
    <PageHeaderWrapper>
      <div className={styles.container}>{children}</div>
    </PageHeaderWrapper>
  );
};
