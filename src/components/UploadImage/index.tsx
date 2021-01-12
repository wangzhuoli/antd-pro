import React, { useEffect, useState } from 'react';
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
// 上传图片按钮
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const {
    multiple = false,
    listType = 'picture-card',
    value,
    limit = 1,
    dirPath = 'other',
    auth = 0,
  } = props;
  const [OSSData, setOSSData] = useState<any>({});
  const [fileList, setFileList] = useState<any[]>([]);

  // 初始化oss上传需要数据
  const initOssData = async () => {
    const { data, error } = await getAliOssPolicy({ dir: dirPath, auth });
    if (!error) {
      setOSSData(data);
    }
  };

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        setFileList(value.map((item) => ({ ...item, Status: 'Ok', auth })));
      } else {
        setFileList([{ url: value, Status: 'Ok', auth }]);
      }
    }
  }, [value]);

  useMount(() => {
    initOssData();
  });

  const onUploadChange = ({ fileList, file }) => {
    const { onChange } = props;
    if (onChange) {
      onChange(limit === 1 ? file.response?.url : [...fileList]);
    }
  };

  const beforeUpload = async () => {
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await init();
    }
  };
  // oss上传需要的额外参数
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

  const renderBtn = () => {
    if (value && value.length >= limit) {
      return null;
    }
    return uploadButton;
  };

  // 上传之前转换对象
  const transformFile = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  const onRemove = (file: any) => {
    const { value, onChange } = props;
    let newFile = null;
    if (limit === 1) {
      setFileList(null);
    } else {
      newFile = value.filter((v) => v.url !== file.url);
    }
    if (onChange) {
      onChange(newFile);
    }
  };

  const uploadProps = {
    name: 'file',
    listType,
    action: OSSData.host,
    accept: 'image/*',
    fileList,
    beforeUpload,
    data: getExtraData,
    onChange: onUploadChange,
    onRemove,
    multiple,
    transformFile,
  };
  return <Upload {...uploadProps}>{renderBtn()}</Upload>;
};

export default UploadImage;
