import { instance } from '@/src/service/index';


export const AuthAPI = {
  async createGuestSession() {
    const res = await instance.get<GuestSession>('/authentication/guest_session/new');
    localStorage.setItem('guest_session_id', res.data.guest_session_id);
    return res.data;
  }


};