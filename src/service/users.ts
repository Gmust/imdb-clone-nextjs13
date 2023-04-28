import { instance } from '@/src/service/index';

export const UsersAPI = {
  async getAccountDetails(session_id: string) {
    const res = await instance.get<User>(`/account?session_id=${session_id}`);
    return res.data;
  },
  async getReviews(id: number) {
  }


};