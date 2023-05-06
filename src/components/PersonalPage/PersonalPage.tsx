'use client';

import React, { SetStateAction, useContext, useEffect, useState } from 'react';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import { useUserLogin } from '@/hooks/react';
import { FavoriteMovies } from '@components/PersonalPage/FavoriteMovies';
import { AccountInfo } from '@components/PersonalPage/AccountInfo';
import { RatedMovies } from '@components/PersonalPage/RatedMovies';
import { AuthContext, useSnackbar } from '@/context';
import { MovieLists } from '@components/PersonalPage/MovieLists';
import { useRouter } from 'next/navigation';
import { CreateListModal } from '@components/MoviePage/MovieMainInfo/MovieIteractions/InteractWithList/CreateListModal';
import { MoviesAPI } from '@/src/service/movies';


export const PersonalPage = () => {


  const { user, setFavMovies, favMovies, setLists, setUser, setCurrentList, lists } = useContext(UserContext);
  const { token, setIsAuth, setToken } = useContext(AuthContext);
  const [ratedMovies, setRatedMovies] = useState<RatedMovies[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<ListLanguages[]>([]);
  const login = useUserLogin();
  const router = useRouter();
  const addSnackbar = useSnackbar();

  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const session_id = localStorage.getItem('session_id');
      const favMoviesRes = await UsersAPI.getFavoriteMovies(user.id, session_id!);
      const ratedMoviesRes = await UsersAPI.getRatedMovies(user.id, session_id!);
      const listsRes = await UsersAPI.getCreatedLists(user.id, session_id!);
      // @ts-ignore
      setFavMovies(favMoviesRes.results);
      // @ts-ignore
      setRatedMovies(ratedMoviesRes.results);
      // @ts-ignore
      setLists(listsRes.data.results);
    };
    fetchData();
  }, [user]);

  const handleQuitUser = () => {
    router.push('/');
    localStorage.removeItem('session_id');
    setIsAuth(false);
    setToken({ id: '', type: null });
    setUser({} as User);
    setCurrentList({} as List);
    setRatedMovies([]);
    setLists([]);
    router.refresh();
    addSnackbar({
      text: 'Successfully logged out',
      variant: 'success',
      key: 'success'
    });
  };
  const handleCreateList = () => {
    setIsOpen(true);
    MoviesAPI.getLanguages().then(r => setLanguages(r.data));
  };

  return (
    <div className='flex flex-col justify-center sm:flex-row sm:justify-normal  mt-2 sm:mt-5 sm:space-x-10 ml-4
     sm:ml-16 '>

      <>
        <AccountInfo avatar={user.avatar?.tmdb?.avatar_path} username={user.username} name={user.name}
                     handleQuit={handleQuitUser} />
      </>


      <div className='flex flex-col space-y-4 '>
        <>
          {
            favMovies.length >= 1 ?
              <div>
                <span className='text-xl sm:text-2xl font-semibold'>Favorites:</span>
                <FavoriteMovies favMovies={favMovies} />
              </div>
              : null
          }
        </>
        <>
          {
            ratedMovies?.length! >= 1 ?
              <div>
                <span className='text-xl sm:text-2xl font-semibold'>Rated movies:</span>
                <RatedMovies ratedMovies={ratedMovies} />
              </div>
              : null
          }
        </>
        <>
          {
            lists?.length >= 1 ?
              <div className='space-y-4'>
                <div className='flex space-x-6'>
                  <span className='text-xl sm:text-2xl font-semibold'>Movie lists:</span>
                  <button onClick={handleCreateList}
                          className='border-2 border-solid border-slate-500 dark:border-white text-lg p-1 hover:scale-110
                         transition duration-300  hover:dark:bg-fuchsia-950 hover:bg-amber-200 '>
                    Create List
                  </button>
                </div>
                <MovieLists lists={lists} />
              </div>
              : <button onClick={handleCreateList}
                        className='border-2 border-solid border-slate-500 dark:border-white text-lg p-2 hover:scale-110
                         transition duration-300  hover:dark:bg-fuchsia-950 hover:bg-amber-200 '>
                Create List
              </button>
          }
        </>
        <CreateListModal showModal={isOpen} setShowModal={setIsOpen} languages={languages} />
      </div>
    </div>
  );
};

