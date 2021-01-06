import request from '@/utils/request'
/* 获取用户列表 */
export const getAllRolesList = (): Promise<any> => {
  return request.get('/api/admin/system/rbac/roles/all', {
  })
};
 