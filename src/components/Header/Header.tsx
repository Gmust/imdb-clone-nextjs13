import Link from 'next/link';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { MenuItem } from '@components/Header/MenuItem';
import { ROUTES } from '@utils/constants';
import { ThemeSwitch } from '@components/Header/ThemeSwitch';

export const Header = () => {
  return (
    <div className='flex justify-between mx-6 max-w-6xl sm:mx-auto items-center py-3 '>
      <div className='flex select-none'>
        <MenuItem title='HOME' url={ROUTES.HOME} Icon={AiFillHome} />
        <MenuItem title='ABOUT' url={ROUTES.ABOUT} Icon={AiFillInfoCircle} />
      </div>

      <div className='flex items-center space-x-5'>

          <ThemeSwitch />

        <Link href={ROUTES.HOME}>
          <h2 className='hidden sm:inline my-2 text-2xl select-none'>
            <span className='font-bold bg-amber-500 py-1 px-2 rounded-2xl mr-1'>IMDb</span>
            <span>Clone</span>
          </h2>
          <FaImdb className='text-4xl bg-amber-500 sm:hidden' />
        </Link>
      </div>

    </div>
  );
};

