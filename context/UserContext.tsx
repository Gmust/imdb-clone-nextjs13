'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';


interface UserContextParams {
  user: User,
  favMovies: FavMovies[],
  setFavMovies: Dispatch<SetStateAction<FavMovies[]>>
  setUser: Dispatch<SetStateAction<User>>
}


export const UserContext = createContext<UserContextParams>({
  user: {} as User,
  favMovies: [] as FavMovies[],
  setFavMovies: () => [] as FavMovies[],
  setUser: () => {
  }
});


export const UserProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>({} as User);
  const [favMovies, setFavMovies] = useState<FavMovies[]>([]);


  return (
    <UserContext.Provider value={{
      favMovies,
      setFavMovies,
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );

};