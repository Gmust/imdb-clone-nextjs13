'use client';
import { useContext } from 'react';
import { ViewContext } from '@/context';

export const Modal = ({ children }: any) => {

  const { showModal, setShowModal } = useContext(ViewContext);


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

