'use client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface AuthContextParams {
  isAuth: boolean,
  isGuest: boolean,
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setIsGuest: Dispatch<SetStateAction<boolean>>
}


export const AuthContext = createContext<AuthContextParams>(
  {
    isAuth: false,
    isGuest: false,
    setIsAuth: () => false,
    setIsGuest: () => false
  });

export const AuthProvider = ({ children }: any) => {

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const guest_session_id = localStorage.getItem('guest_session_id');

    if (session_id) {
      setIsAuth(true);
    }
    if (guest_session_id) {
      setIsGuest(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      isGuest,
      setIsAuth,
      setIsGuest
    }}>
      {children}
    </AuthContext.Provider>
  );

};