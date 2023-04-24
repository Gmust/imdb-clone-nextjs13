'use client';

import { useEffect } from 'react';
import { UsersAPI } from '@/src/service/users';

export const PersonalPage = () => {

  useEffect(() => {

    const fetchAccount = async () => {
      const session_id = localStorage.getItem('session_id');
      const token = JSON.parse(session_id!).request_token;
      const res = await UsersAPI.getAccountDetails(token);
    };

    fetchAccount()

  }, []);

  return (
    <div>

    </div>
  );
};

