import { FC } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface MenuItemParams {
  title: string;
  url: string;
  Icon: IconType;
}

export const MenuItem: FC<MenuItemParams> = ({ url, Icon, title }) => {
  return (
    <Link href={url} className='mx-4 lg:mx-6 hover:text-amber-300'>
      <Icon className='text-2xl sm:hidden' />
      <p className='hidden sm:inline my-2 text-2xl'>{title}</p>
    </Link>
  );
};

