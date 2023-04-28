import { instance } from '@/src/service/index';


export const AuthAPI = {
  async createGuestSession() {
    const res = await instance.get<GuestSession>('/authentication/guest_session/new');
    const item = {
      id: res.data.guest_session_id,
      expiry: new Date().getTime() + (24 * 1000 * 60 * 60)
    };
    localStorage.setItem('guest_session_id', JSON.stringify(item));
    return res.data;
  },
  async getTemporaryToken() {
    const temporaryToken = await instance.get<LoginUserSession>('/authentication/token/new');
    return temporaryToken.data.request_token;
  },
  async loginUser({ username, password, temporaryToken }: LoginForm) {
    const requestToken = await instance.post<LoginUserSession>('/authentication/token/validate_with_login', {
      username: username,
      password: password,
      request_token: temporaryToken
    });
    const session = await instance.post<{ success: boolean, session_id: string }>(`/authentication/session/new`, {
      request_token: requestToken.data.request_token
    });
    localStorage.setItem('session_id', session.data.session_id);
    return session;
  }
};