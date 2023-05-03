'use client';
import { Modal } from '@/assets/Modals';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { UsersAPI } from '@/src/service/users';
import { AuthContext, useSnackbar } from '@/context';


interface CreateListModal {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  languages: ListLanguages[]
}

export const CreateListModal = ({ showModal, setShowModal, languages }: CreateListModal) => {

  const [name, setName] = useState<string | null>(null);
  const [description, setDesc] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const addSnackbar = useSnackbar();
  const { token } = useContext(AuthContext);


  const handleCreateList = async () => {
    if (name?.length! > 0 && name != null) {
      const res = await UsersAPI.creatList(
        { name, description, session_id: token.id, language: lang }
      );
      addSnackbar({
        key: 'success',
        variant: 'success',
        text: res.data.status_message
      });
      setShowModal(false);
    } else {
      addSnackbar({
        key: 'error',
        variant: 'error',
        text: 'Enter name please!'
      });
    }
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='flex flex-col items-center space-y-4'>
        <h3 className='text-2xl text-amber-500 text-center'>Create list</h3>

        <div>
          <div className='flex text-black items-center'>
            <label htmlFor='name'>
              Enter name:
            </label>
            <input id='name' onChange={e => setName(e.target.value)}
                   className='m-2 bg-slate-200 rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 ' />
          </div>

          <div className='flex text-black items-center'>
            <label htmlFor='description'>
              Enter description:
            </label>
            <input id='description' onChange={e => setDesc(e.currentTarget.value)}
                   className='m-2 bg-slate-200 rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500' />
          </div>
        </div>

        <select name='languages' onChange={(e) => setLang(e.target.value)}
                className='m-2 bg-white text-fuchsia-600 relative rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500'>
          <option value='' hidden>Select Language(optional)</option>
          {languages?.map((lang, index) =>
            <option key={index} value={lang.english_name}>
              {lang.english_name}
            </option>
          )}
        </select>

        <button disabled={!name && !description} onClick={handleCreateList}
                className={!name && !description ? 'cursor-not-allowed opacity-95 border-2 border-solid border-slate-300 p-1 rounded-lg' :
                  'cursor-pointer text-xl text-black p-1 rounded-lg border-2 border-solid border-black hover:scale-110 hover:bg-fuchsia-500 transition duration-200'
                }>
          Create
        </button>
      </div>
    </Modal>
  );
};

