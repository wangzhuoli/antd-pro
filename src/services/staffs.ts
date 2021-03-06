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
 
/*  员工详情 */

export const getStaffsDetails = (id): Promise<any> => request.get(`/api/admin/user/staffs/${id}`);

/*  新建员工 */
export const createStaffs = (params): Promise<any> => request.post("/api/admin/user/staffs", {
  data: params
});
/*  更新员工 */
export const updateStaffs = (params): Promise<any> => { 
  const { id } = params
  return request.put(`/api/admin/user/staffs/${id}`, {
    data: params
  })
};