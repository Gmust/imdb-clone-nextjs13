'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ListCard } from '@components/ListPage/ListCard';
import { Modal } from '@/assets/Modals';
import { ListConfirm } from '@components/ListPage/ListConfirm';
import { AuthContext, useSnackbar } from '@/context';
import { UsersAPI } from '@/src/service/users';

export const List = (list: ListDetails) => {

  const router = useRouter();
  const { token } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const addSnackbar = useSnackbar();

  const handleClearList = async () => {
    try {
      const res = await UsersAPI.clearList(+list.id, token.id, true);
      router.refresh();
      setShowClearModal(false);
      addSnackbar({
        key: 'success',
        text: res.data.status_message,
        variant: 'success'
      });
    } catch (e: any) {
      addSnackbar({
        key: 'error',
        text: e.response.data.status_message,
        variant: 'error'
      });
    }
  };

  const handleDeleteList = async () => {
    try {
      const res = await UsersAPI.deleteList(token.id, list.id);
      setShowDeleteModal(false);
      router.push('/personal-area');
      addSnackbar({
        key: 'success',
        text: res.data.status_message,
        variant: 'success'
      });
    } catch (e: any) {
      setShowDeleteModal(false);
      router.push('/personal-area');
    }
  };
  return (
    <>
      <div className='flex flex-col mt-5'>
        <div className='text-xl flex justify-around'>
          <div>
            <h2><span className='text-amber-500'>Name:</span> {list.name}</h2>
            <p><span className='text-amber-500'>Description:</span> {list.description}</p>
          </div>

          <div className='space-x-4 '>
            <button onClick={() => setShowDeleteModal(true)}
                    className='border-2 border-solid border-slate-1000 hover:bg-red-600 rounded-lg p-2 dark:border-white
             transition duration-200'>
              Delete list
            </button>

            <button onClick={() => setShowClearModal(true)}
                    className='border-2 border-solid border-slate-1000 hover:bg-sky-800 rounded-lg p-2 dark:border-white
             transition duration-200'>
              Clear list
            </button>
          </div>

        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-4 py-4'>
          {list.items.map(movie =>
            <ListCard key={movie.id} listId={list.id} movie={movie} />
          )}
        </div>
      </div>

      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <ListConfirm showModal={setShowDeleteModal} func={handleDeleteList} text={'delete'} />
      </Modal>

      <Modal showModal={showClearModal} setShowModal={setShowClearModal}>
        <ListConfirm showModal={setShowClearModal} func={handleClearList} text={'clear'} />
      </Modal>
    </>

  );
};

