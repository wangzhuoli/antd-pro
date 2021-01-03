import request from '@/utils/request';

export type AliOssParams = {}

export const getAliOssPolicy = (params: AliOssParams) => request.get("/api/ali/policy", {
  data: params
});