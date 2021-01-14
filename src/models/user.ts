import type { Effect, Reducer } from 'umi';
import { getCurrentUser } from '@/services/user'; 
import { setAuthority} from '@/utils/authority'

export type CurrentUser = {
  avatar?: string;
  gender?: 0 | 1;
  nickname?: string;
  role?: string;
  uid?: string;
  username?: string;
};

export type UserModelState = {
  auth: {
    permissions: null | string[];
    roles: null | string[];
  };
  user: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
};

function getAuthoritys(auth) {
  const { permissions = [], roles = [] } = auth;
  if (roles.includes('admin') || roles.includes('super-admin')) { 
    return ['admin']
  }
  return permissions
 }

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    auth: {
      permissions: null,
      roles: null
    },
    user: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const { data } = yield call(getCurrentUser);
      if (data) {
      const authoritys = getAuthoritys(data.auth)
      setAuthority(authoritys)
        
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
       }
    },
  },
  reducers: {
    saveCurrentUser(_, { payload }) {
      const { auth, user } = payload
      return {
        auth,
        user
      };
    }
  }
};

export default UserModel;
