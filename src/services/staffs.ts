import request from '@/utils/request'

export type getStaffsParams = { 
  page?: number;
  size?: number;
  username?: string;
}

export const getStaffsList = (params: getStaffsParams): Promise<any> => {
  return request.get('/api/admin/user/staffs', {
    params
  })
 };