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
  }
};