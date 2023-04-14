'use client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';


type TokenType = {
  id: string,
  type: 'user' | 'guest' | null
}

interface AuthContextParams {
  isAuth: boolean,
  isGuest: boolean,
  token: TokenType,
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setIsGuest: Dispatch<SetStateAction<boolean>>
}


export const AuthContext = createContext<AuthContextParams>(
  {
    isAuth: false,
    isGuest: false,
    token: { type: null, id: '' },
    setIsAuth: () => false,
    setIsGuest: () => false
  });

export const AuthProvider = ({ children }: any) => {

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [token, setToken] = useState<TokenType>({ type: null, id: '' });

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const guest_session_id = localStorage.getItem('guest_session_id');

    const now = new Date();

    if (session_id) {
      const item = JSON.parse(session_id);

      if (item.expiry < now.getTime()) {
        setIsAuth(false);
        localStorage.removeItem('session_id');
      } else {
        setToken({ id: item.id, type: 'user' });
        setIsAuth(true);
      }
    }

    if (guest_session_id) {

      const item = JSON.parse(guest_session_id);

      if (item.expiry < now.getTime()) {
        setIsGuest(false);
        localStorage.removeItem('guest_session_id');
      } else {
        setToken({ id: item.id, type: 'guest' });
        setIsGuest(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      isGuest,
      setIsAuth,
      setIsGuest,
      token
    }}>
      {children}
    </AuthContext.Provider>
  );

};