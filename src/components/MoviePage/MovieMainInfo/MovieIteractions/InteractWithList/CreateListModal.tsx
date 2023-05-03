'use client';
import { Modal } from '@/assets/Modals';
import React, { Dispatch, SetStateAction, useState } from 'react';


interface CreateListModal {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  languages: ListLanguages[]
}

export const CreateListModal = ({ showModal, setShowModal, languages }: CreateListModal) => {

  const [name, setName] = useState<string | null>(null);
  const [description, setDesc] = useState<string | null>(null);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='flex flex-col items-center space-y-4'>
        <h3 className='text-2xl text-amber-500 text-center'>Create list</h3>

        <div>
          <div className='flex text-black items-center'>
            <label htmlFor='name'>
              Enter name:
            </label>
            <input id='name'
                   className='m-2 bg-slate-200 rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 ' />
          </div>

          <div className='flex text-black items-center'>
            <label htmlFor='description'>
              Enter description:
            </label>
            <input id='description'
                   className='m-2 bg-slate-200 rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500' />
          </div>
        </div>

        <select name='languages'
                className='m-2 bg-white text-fuchsia-600 relative rounded-lg border-2 border-solid border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500'>
          <option value='' hidden>Select Language(optional)</option>
          {languages?.map((lang, index) =>
            <option key={index} value={lang.english_name}>
              {lang.english_name}
            </option>
          )}
        </select>

        <button disabled={true} onClick={() => console.log('click')}
                className='cursor-cell text-xl text-black border-2 border-solid border-amber-500'>
          Create
        </button>
      </div>
    </Modal>
  );
};

