import request from '@/utils/request';

export async function getCurrentUser(): Promise<any> {
  return request('/api/api/user/info');
}
