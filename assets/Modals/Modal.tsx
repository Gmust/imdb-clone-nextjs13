'use client';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ViewContext } from '@/context';


type ModalInterface = {
  children: React.ReactNode,
  showModal: boolean,
  setShowModal: (Dispatch<SetStateAction<boolean>>)
}

export const Modal = ({ children, setShowModal, showModal }: ModalInterface) => {


  return (
    <div
      className={showModal ? `opacity-100 pointer-events-auto h-screen w-screen  modalWrapper`
        : `h-screen w-screen modalWrapper`}
      onClick={() => setShowModal(false)}>
      <div className={showModal ? `scale-100  modalContent` : `modalContent`}
           onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

