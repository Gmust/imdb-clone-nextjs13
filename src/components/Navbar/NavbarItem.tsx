'use client';
import { FC } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface NavbarItemProps {
  title: string;
  param: Category['category'];
}

export const NavbarItem: FC<NavbarItemProps> = ({ title, param }) => {

  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  return (
    <div className='hover:text-amber-500 select-none'>
      <Link href={`/?genre=${param}`} className={genre && genre === param ?
        ' underline underline-offset-8 decoration-2 decoration-amber-500 rounded-lg' : ''}>
        {title}
      </Link>
    </div>
  );
};

