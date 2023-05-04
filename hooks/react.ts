import { AuthAPI } from '@/src/service/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, useSnackbar, ViewContext } from '@/context';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import { start } from 'repl';


export const useGuestLogin = () => {

  const { setIsGuest } = useContext(AuthContext);
  const addSnackBar = useSnackbar();

  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(res.success);
      addSnackBar({
        key: 'success',
        text: 'Successfully logged in like guest',
        variant: 'success'
      });
    } catch (e: any) {
      alert(e.message);
    }
  };

  return handleLoginLikeGuest;
};

export const useUserLogin = () => {

  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);

  const fetchAccount = async () => {
    try {
      const session_id = localStorage.getItem('session_id');
      setToken({ id: session_id!, type: 'user' });
      const res = await UsersAPI.getAccountDetails(session_id!);
      setUser(res);
    } catch (e) {
      console.error(e);
    }
  };


  return fetchAccount;
};

