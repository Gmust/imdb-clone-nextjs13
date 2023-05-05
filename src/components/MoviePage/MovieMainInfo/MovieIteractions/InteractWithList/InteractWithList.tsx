'use client';

import React, { useContext, useEffect, useState } from 'react';
import { MdCreateNewFolder, MdFilterList, MdFilterListOff } from 'react-icons/md';
import { VscNewFile } from 'react-icons/vsc';
import { AiOutlineCheck, AiOutlineSelect } from 'react-icons/ai';
import { AuthContext, useSnackbar } from '@/context';
import { MoviesAPI } from '@/src/service/movies';
import { CreateListModal } from '@components/MoviePage/MovieMainInfo/MovieIteractions/InteractWithList/CreateListModal';
import { UserContext } from '@/context/UserContext';
import { UsersAPI } from '@/src/service/users';

export const InteractWithList = ({ movieId }: { movieId: string | number }) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [languages, setLanguages] = useState<ListLanguages[]>();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { isAuth, token } = useContext(AuthContext);
    const { lists, currentList, setCurrentList } = useContext(UserContext);
    const addSnackbar = useSnackbar();

    const handleCreateList = () => {
      if (isAuth) {
        setShowModal(true);
        MoviesAPI.getLanguages().then(r => setLanguages(r.data));
      } else {
        addSnackbar({
          variant: 'info',
          key: 'info',
          message: 'You need to be logged in to create movie list! '
        });
      }
    };

    const handleAddToList = async () => {
      if (!isAuth) {
        addSnackbar({
          key: 'error',
          variant: 'error',
          text: 'You need to be logged in!'
        });
        return;
      } else if (!currentList.id) {
        addSnackbar({
          key: 'info',
          variant: 'info',
          text: 'Select list!'
        });
        return;
      } else {
        try {
          const res = await UsersAPI.addToList(currentList.id, token.id, +movieId);
          addSnackbar({
            key: 'success',
            variant: 'success',
            text: res.data.status_message
          });
        } catch (e: any) {
          addSnackbar({
            key: 'error',
            variant: 'error',
            text: e.response.data.status_message
          });
        }
      }
    };


    return (
      <>
        <div className='z-10 flex-col relative items-center mt-0.5'>
          {showDropdown ?
            <MdFilterListOff onClick={() => setShowDropdown(!showDropdown)}
                             className='text-3xl cursor-pointer hover:scale-110' />
            :
            <MdFilterList onClick={() => setShowDropdown(!showDropdown)}
                          className='text-3xl cursor-pointer hover:scale-110' />
          }
          <div className={`z-10  ${showDropdown ? '' : 'hidden'} bg-white rounded-lg w-32 dark:bg-gray-700 absolute`}>
            <ul className='py-2 space-y-1 ml-1 border-2 border-solid border-amber-50 dark:border-none'>
              <li className='flex  text-xl cursor-alias  items-center hover:bg-amber-200 dark:hover:bg-slate-1000'>
                Create list <MdCreateNewFolder className='ml-2' onClick={handleCreateList} />
              </li>
              <li className='flex text-xl  cursor-alias items-center hover:bg-amber-200  dark:hover:bg-slate-1000'>
                Add to list <VscNewFile className='ml-2' onClick={handleAddToList} />
              </li>
              <li className='flex text-xl cursor-alias  items-center hover:bg-amber-200 dark:hover:bg-slate-1000 relative'
                  onMouseEnter={() => setHover(true)}>
                Select list <AiOutlineSelect className='ml-2' />
                <ul onMouseLeave={() => setHover(false)}
                    className={`absolute z-10  ${hover ? '' : 'hidden'} bg-white rounded-lg w-32 dark:bg-gray-700 absolute
                                sm:ml-32 `}>
                  {lists.map((list) =>
                    <li
                      className='flex text-xl  cursor-alias items-center hover:bg-amber-200  dark:hover:bg-slate-1000 '
                      key={list.id}>
                      <span className='line-clamp-1 w-24' onClick={() => setCurrentList(list)}>{list.name}</span>
                      {currentList?.id === list.id ?
                        <AiOutlineCheck /> : null}
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <CreateListModal showModal={showModal} setShowModal={setShowModal} languages={languages!} />
      </>
    );
  }
;

