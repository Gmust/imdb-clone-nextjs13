import { instance } from '@/src/service/index';
import { inflate } from 'zlib';

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
  },
  async checkListStatus(listId: string | number, movieId: number) {
    const res = instance.get(`/list/${listId}/item_status?movie_id=${movieId}`);
    return res;
  },
  async creatList({ session_id, name, language, description }: CreateListParams) {
    const res = instance.post<{ status_message: string, success: boolean, status_code: number, list_id: number }>
    (`/list?session_id=${session_id}`, { name, language, description });
    return res;
  },
  async getCreatedLists(account_id: string, session_id: string) {
    return instance.get<Result<List[]>>(`/account/${account_id}/lists?session_id=${session_id}`);
  },
  async deleteList(session_id: string, list_id: string) {
    return instance.delete(`/list/${list_id}?session_id=${session_id}`);
  }
};