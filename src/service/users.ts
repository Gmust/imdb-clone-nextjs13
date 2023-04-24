import { instance } from '@/src/service/index';

export const UsersAPI = {
  async getAccountDetails(token: string) {
    const res = await instance.get<User>(`/account?session_id=${token}`);
    console.log(res);
  },
  async getReviews(id: number) {
  }


};