'use client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';


interface UserContextParams {
  user: User,
  favMovies: FavMovies[],
  lists: List[],
  currentList: List,
  setLists: Dispatch<SetStateAction<List[]>>,
  setFavMovies: Dispatch<SetStateAction<FavMovies[]>>,
  setUser: Dispatch<SetStateAction<User>>,
  setCurrentList: Dispatch<SetStateAction<List>>
}


export const UserContext = createContext<UserContextParams>({
  user: {} as User,
  favMovies: [] as FavMovies[],
  lists: [] as List[],
  currentList: {} as List,
  setLists: () => [] as List[],
  setFavMovies: () => [] as FavMovies[],
  setUser: () => {
  },
  setCurrentList: () => {

  }
});


export const UserProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>({} as User);
  const [favMovies, setFavMovies] = useState<FavMovies[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [currentList, setCurrentList] = useState<List>({} as List);

  useEffect(() => {

    if (!currentList && lists) {
      setCurrentList(lists[0]);
    }
  }, [lists]);

  return (
    <UserContext.Provider value={{
      favMovies,
      setFavMovies,
      user,
      setUser,
      lists,
      setLists,
      currentList,
      setCurrentList
    }}>
      {children}
    </UserContext.Provider>
  );

};