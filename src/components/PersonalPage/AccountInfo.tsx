'use client';

import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { CONSTANTS } from '@utils/constants';

interface AccountInfo {
  avatar: string | undefined,
  username: string,
  name: string,
  handleQuit: () => void
}

export const AccountInfo = ({ username, name, avatar, handleQuit }: AccountInfo) => {
  return (
    <div className='flex flex-col'>
      <div>
        <Image
          src={avatar ? CONSTANTS.IMAGE_URL + '/' + avatar : '/defaultAvatar.webp'}
          alt={''} width={200} height={200}
          className='rounded-lg shadow-2xl dark:shadow-amber-500/40' />
      </div>

      <div className='mt-4'>
        <ul>
          {username &&
            <li className='flex items-center'>
              <span className='text-xl mr-2'>Username:</span>
              <h2 className='text-xl text-amber-500'>{username}</h2>
            </li>}
          {name &&
            <li className='flex items-center'>
              <span className='text-xl mr-2'>Name:</span>
              <h2 className='text-xl text-amber-500'>{name}</h2>
            </li>}
        </ul>
      </div>

      <div>
        <button className='flex items-center rounded-lg p-2 border-2 border-solid border-slate-600 dark:text-white text-black
                          text-2xl mt-4 hover:bg-red-600 hover:scale-110 transition duration-200' onClick={handleQuit}>
          Quit <FiLogOut className='ml-2' />
        </button>
      </div>
    </div>
  );
};

