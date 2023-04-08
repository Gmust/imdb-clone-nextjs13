import { FC } from 'react';
import { NavbarItem } from '@components/Navbar/NavbarItem';

export const Navbar: FC = () => {
  return (
    <div className='flex justify-center bg-amber-50 dark:bg-slate-800 sm:text-2xl p-2 space-x-2 sm:space-x-10
      font-semibold'>
      <NavbarItem title='Trending' param='popular' />
      <NavbarItem title='Top rated' param='top_rated' />
      <NavbarItem title='Upcoming' param='upcoming' />
    </div>
  );
};

