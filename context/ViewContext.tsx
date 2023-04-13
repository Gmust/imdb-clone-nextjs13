'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ViewContextParams {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
}


export const ViewContext = createContext<ViewContextParams>(
  {
    showModal: false,
    setShowModal: () => false
  });

export const ViewProvider = ({ children }: any) => {

  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <ViewContext.Provider value={{
      showModal,
      setShowModal
    }}>
      {children}
    </ViewContext.Provider>
  );

};