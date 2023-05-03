'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';


interface UserContextParams {
  user: User,
  favMovies: FavMovies[],
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>
  setFavMovies: Dispatch<SetStateAction<FavMovies[]>>
  setUser: Dispatch<SetStateAction<User>>
}


export const UserContext = createContext<UserContextParams>({
  user: {} as User,
  favMovies: [] as FavMovies[],
  lists: [] as List[],
  setLists: () => [] as List[],
  setFavMovies: () => [] as FavMovies[],
  setUser: () => {
  }
});


export const UserProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>({} as User);
  const [favMovies, setFavMovies] = useState<FavMovies[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  return (
    <UserContext.Provider value={{
      favMovies,
      setFavMovies,
      user,
      setUser,
      lists,
      setLists
    }}>
      {children}
    </UserContext.Provider>
  );

};