'use client';

import React, { useContext, useState } from 'react';
import { MdCreateNewFolder, MdFilterList, MdFilterListOff } from 'react-icons/md';
import { VscNewFile } from 'react-icons/vsc';
import { AiOutlineSelect } from 'react-icons/ai';
import { AuthContext, useSnackbar, ViewContext } from '@/context';
import { Modal } from '@/assets/Modals';
import { MoviesAPI } from '@/src/service/movies';
import { CreateListModal } from '@components/MoviePage/MovieMainInfo/MovieIteractions/InteractWithList/CreateListModal';

export const InteractWithList = ({}) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [languages, setLanguages] = useState<ListLanguages[]>();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { isAuth, token } = useContext(AuthContext);
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
                Add to list <VscNewFile className='ml-2' />
              </li>
              <li className='flex text-xl cursor-alias  items-center hover:bg-amber-200 dark:hover:bg-slate-1000'>
                Select list <AiOutlineSelect className='ml-2' />
              </li>
            </ul>
          </div>
        </div>

       <CreateListModal showModal={showModal} setShowModal={setShowModal} languages={languages!} />
      </>
    );
  }
;

//block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white