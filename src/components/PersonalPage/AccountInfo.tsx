import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';

interface AccountInfo {
  avatar: string | undefined,
  username: string,
  name: string
}

export const AccountInfo = ({ username, name, avatar }: AccountInfo) => {
  return (
    <div className='flex flex-col'>
      <div>
        <Image
          src={avatar ? CONSTANTS.IMAGE_URL + '/' + avatar : '/defaultAvatar.webp'}
          alt={''} width={200} height={200}
          className='rounded-lg shadow-2xl shadow-amber-500/40' />
      </div>

      <div>
        <ul>
          <li className='flex items-center'>
            <span className='text-xl mr-2'>Username:</span>
            <h2 className='text-xl dark:text-amber-500'>{username}</h2>
          </li>
          <li className='flex items-center'>
            <span className='text-xl mr-2'>Name:</span>
            <h2 className='text-xl dark:text-amber-500'>{name}</h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

