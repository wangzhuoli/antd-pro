import { getItem, setItem, removeItem } from '@/utils/localStorage';

const TokenKey = 'token';

export default {
  token: '',

  setToken(token: string) {
    setItem(TokenKey, token);
    this.token = token;
  },

  getToken() {
    if (this.token) {
      return this.token
    }
    return getItem(TokenKey)
  },
  removeToken() {
    this.token = '';
    removeItem(TokenKey)
   }
}
