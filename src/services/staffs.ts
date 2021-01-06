import request from '@/utils/request'

export type getStaffsParams = { 
  page?: number;
  size?: number;
  username?: string;
}
/* 获取用户列表 */
export const getStaffsList = (params: getStaffsParams): Promise<any> => {
  return request.get('/api/admin/user/staffs', {
    params
  })
};
 
/* 删除用户 */
export const delStaffs = (id: string): Promise<any> => {
  return request.delete(`/api/admin/user/staffs/${id}`, {
  })
 };