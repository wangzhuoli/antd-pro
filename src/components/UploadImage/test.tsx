import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import Axios from 'axios';
import bytes from 'bytes';
import dayjs from 'dayjs';
import React, { memo, useEffect, useState } from 'react';
import { getRandomIntInclusive } from '../../utils/utils';

function UploadOSS(props) {
  const {
    onChange,
    value,
    dirPath,
    listType,
    multiple,
    accept,
    limit,
    sizeLimit,
    className,
    width,
    height,
  } = props;
  const [uploadData, setUploadData] = useState({});
  let flag = false;

  // 初始化上传所需参数（从接口获取，过程省略）
  const init = async () => {
    setUploadData({});
  };

  useEffect(() => {
    init();
  }, [dirPath]);

  // 捕捉上传出错的文件
  const handleChange = ({ file, fileList }) => {
    if (file.status === 'error') {
      message.error('上传出错！');
    }
    if (onChange) {
      onChange(fileList.filter((v) => v.status === 'done' || v.status === 'uploading'));
    }
  };

  // 移除文件
  const onRemove = (file) => {
    const files = value.filter((v) => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };

  // 上传之前转换对象
  const transformFile = (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = `${getRandomIntInclusive(1000, 9999)}-${dayjs().format(
      'YYYY-MM-DD',
    )}${Date.now()}${suffix}`;
    file.url = `${dirPath}${filename}`;
    return file;
  };

  // 上传所需额外参数
  const getExtraData = (file) => {
    return {
      key: file.url,
      success_action_status: 200,
      policy: uploadData.policy,
      Signature: uploadData.signature,
    };
  };

  // 图片尺寸比例限制
  const checkSize = (file) => {
    return new Promise((resolve, reject) => {
      const url = window.URL || window.webkitURL;
      const img = new Image();
      img.onload = () => {
        const valid =
          img.width >= width && img.height >= height && img.width / img.height === width / height;
        valid ? resolve() : reject();
      };
      img.src = url.createObjectURL(file);
    }).then(
      () => {
        return true;
      },
      () => {
        if (flag) {
          Modal.error({
            title: `图片尺寸不符合要求，请修改后重新上传！`,
          });
          flag = false;
        }
        return Promise.reject();
      },
    );
  };

  // 图片大小限制
  const checkLimit = (file) => {
    return new Promise((resolve, reject) => {
      file.size <= sizeLimit ? resolve() : reject();
    }).then(
      () => {
        return true;
      },
      () => {
        if (flag) {
          Modal.error({
            title: `超过大小限制${bytes(sizeLimit)}，请重新选择！`,
          });
          flag = false;
        }
        return Promise.reject();
      },
    );
  };

  // 数量限制
  const checkLen = (fileList) => {
    return new Promise((resolve, reject) => {
      const isLen = value.length + fileList.length;
      isLen <= limit ? resolve() : reject();
    }).then(
      () => {
        return true;
      },
      () => {
        if (flag) {
          Modal.error({
            title: `超过最大上传数量${limit}张，请重新选择！`,
          });
          flag = false;
        }
        return Promise.reject();
      },
    );
  };

  // 判断所有条件满足才能上传
  const beforeUpload = async (file, fileList) => {
    flag = true;
    const isLen = limit ? await checkLen(fileList) : true;
    const isSizeLimit = sizeLimit ? await checkLimit(file) : true;
    const isSize = width ? await checkSize(file) : true;
    const expire = uploadData.expire * 1000;
    if (expire < Date.now()) {
      await init();
    }
    return isLen && isSizeLimit && isSize;
  };

  // 图片预览处理
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src || src.indexOf('http') === -1) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const uploadProps = {
    name: 'file',
    fileList: value,
    action: uploadData.host,
    onChange: handleChange,
    data: getExtraData,
    onPreview: handlePreview,
    onRemove,
    transformFile,
    beforeUpload,
    listType,
    multiple,
    accept,
    className,
  };

  // 文件和图片使用不同的样式
  const Con = () =>
    listType ? (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    ) : (
      <Button>
        <UploadOutlined /> 上传
      </Button>
    );

  return <Upload {...uploadProps}>{value && value.length < limit && Con()}</Upload>;
}

export default memo(UploadCustom);
