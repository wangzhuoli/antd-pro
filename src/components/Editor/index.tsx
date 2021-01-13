import React, { useState, useEffect, useCallback } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { useMount } from 'ahooks';
import { getAliOssPolicy } from '@/services/ali';

const Editor = (props: any) => {
  const { value, onChange } = props;
  const [OSSData, setOSSData] = useState<any>({});
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(null));

  // 初始化oss上传需要数据
  const initOssData = async () => {
    const { data, error } = await getAliOssPolicy({ dir: 'other' });
    if (!error) {
      setOSSData(data);
    }
  };

  useMount(() => {
    // initOssData();
  });

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (editorState: any) => {
    const html = editorState.toHTML();
    onChange(html);
  };

  const uploadFn = useCallback(async (param) => {
    const { data, error } = await getAliOssPolicy({ dir: 'other' });
    if (error) {
      return;
    }
    const serverURL = data.host;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const result = JSON.parse(response.currentTarget.response);
      param.success({
        url: result.url,
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('OSSAccessKeyId', data.accessid);
    fd.append('policy', data.policy);
    fd.append('signature', data.signature);
    fd.append('success_action_status', 200);
    fd.append('callback', data.callback);
    fd.append('key', `www/wealth/other/${param.file.name}`);

    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.send(fd);
  }, []);

  return (
    <BraftEditor
      className={styles.wrapper}
      value={editorValue}
      onChange={handleEditorChange}
      media={{ uploadFn }}
    />
  );
};
export default Editor;
