import request from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
  autoLogin: boolean;
}

export async function login(params: LoginParamsType): Promise<any> {
  return request('/api/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout(): Promise<any> {
  return request('/api/api/user/logout', {
    method: 'POST'
  });
}
