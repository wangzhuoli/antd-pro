import request from '@/utils/request';

export type AliOssParams = {}

export const getAliOssPolicy = (params: AliOssParams) => request.get("/api/api/ali/policy", {
   params
});