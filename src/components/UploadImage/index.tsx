import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAliOssPolicy } from '@/services/ali';
import { useMount } from 'ahooks';

type UploadImageProps = {
  multiple: boolean;
  dirPath: string;
  listType: string;
  value?: null | any[];
  limit?: number;
  auth: 0 | 1;
  onChange?: (value: any) => void;
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const { multiple, listType = 'picture-card', value, limit, dirPath = 'other', auth = 1 } = props;
  const [OSSData, setOSSData] = useState<any>({});

  const init = async () => {
    const { data, error } = await getAliOssPolicy({ dir: dirPath, auth });
    if (!error) {
      setOSSData(data);
    }
  };

  useMount(() => {
    init();
  });

  const onUploadChange = ({ fileList }) => {
    const { onChange } = props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  const beforeUpload = async (file: any, fileList: any[]) => {
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await init();
    }
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  const getExtraData = (file: any) => {
    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      signature: OSSData.signature,
      success_action_status: 200,
      callback: OSSData.callback,
    };
  };
  const uploadProps = {
    name: 'file',
    listType,
    action: OSSData.host,
    accept: 'image/*',
    fileList: value,
    beforeUpload,
    data: getExtraData,
    onChange: onUploadChange,
  };
  return <Upload {...uploadProps}>{uploadButton}</Upload>;
};

export default UploadImage;
