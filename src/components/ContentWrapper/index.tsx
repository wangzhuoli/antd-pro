import React from 'react';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Authorized from '@/components/Authorized/Authorized';

export default (props: { authority?: any; children: React.ReactNode }) => {
  const { children, authority = null } = props;
  return (
    <Authorized authority={authority}>
      <PageHeaderWrapper>
        <div className={styles.container}>{children}</div>
      </PageHeaderWrapper>
    </Authorized>
  );
};
