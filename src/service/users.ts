import { instance } from '@/src/service/index';

export const UsersAPI = {
  async getAccountDetails(session_id: string) {
    const res = await instance.get<User>(`/account?session_id=${session_id}`);
    return res.data;
  },
  async markAsFavorite({ accountId, media_type, media_id, favorite, session_id }: MarkAsFavParams) {
    const res = await instance.post<MarkAsFavRes>(`/account/${accountId}/favorite?session_id=${session_id}`,
      {
        media_type,
        media_id,
        favorite
      });
    return res.data;
  },
  async getFavoriteMovies(account_id: string | number, session_id: string) {
    const res = await instance.get<Result<FavMovies[]>>(`/account/${account_id}/favorite/movies?session_id=${session_id}`);
    return res.data;
  },
  async getRatedMovies(account_id: string | number, session_id: string) {
    const res = await instance.get<Result<RatedMovies[]>>(`/account/${account_id}/rated/movies?session_id=${session_id}`);
    return res.data;
  }
};