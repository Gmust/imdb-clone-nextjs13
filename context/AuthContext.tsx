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
  setToken: Dispatch<SetStateAction<TokenType>>
}


export const AuthContext = createContext<AuthContextParams>(
  {
    isAuth: false,
    isGuest: false,
    token: { type: null, id: '' },
    setIsAuth: () => false,
    setIsGuest: () => false,
    setToken: () => {}
  });

export const AuthProvider = ({ children }: any) => {

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [token, setToken] = useState<TokenType>({ type: null, id: '' });

  useEffect(() => {
  }, [token]);

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const guest_session_id = localStorage.getItem('guest_session_id');

    const now = new Date();

    if (session_id) {
      if (!session_id && !guest_session_id) {
        setIsAuth(false);
        localStorage.removeItem('session_id');
      } else {
        if (localStorage.getItem('guest_session_id')) {
          localStorage.removeItem('guest_session_id');
        }
        setToken({ id: session_id, type: 'user' });
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
  }, [isGuest, isAuth]);

  return (
    <AuthContext.Provider value={{
      isAuth,
      isGuest,
      setIsAuth,
      setIsGuest,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );

};