import { UsersAPI } from '@/src/service/users';
import { List } from '@components/ListPage/List';


const ListPage = async ({ params }: any) => {


  const res = await UsersAPI.getListDetails(params.listId);
  const list = res.data;

  return (
    <List  {...list} />
  );
};

export default ListPage;