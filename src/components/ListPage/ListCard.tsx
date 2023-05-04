'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiLike, BiStar } from 'react-icons/bi';
import { CiCircleRemove } from 'react-icons/ci';
import { AuthContext, useSnackbar } from '@/context';
import { UsersAPI } from '@/src/service/users';

interface ListCardProps {
  movie: ListItem,
  listId: string | number
}

export const ListCard = ({ movie, listId }: ListCardProps) => {

  const { token } = useContext(AuthContext);
  const router = useRouter();
  const addSnackbar = useSnackbar();

  const handleDeleteFromList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await UsersAPI.deleteFromList(+listId, token.id, +movie.id);
      router.refresh();
      addSnackbar({
        key: 'success',
        text: res.data.status_message,
        variant: 'success'
      });
    } catch (e: any) {
      addSnackbar({
        key: 'success',
        text: e.response.data.message,
        variant: 'success'
      });
    }
  };

  return (
    <div className='border-solid border-2 border-slate-400 rounded-lg p-4 sm:hover:shadow-slate-400
                    shadow-md transition-shadow duration-200'>
      <Link href={`/movie/${movie.id}`} className='flex flex-col '>
        <div className='flex justify-between'>
          <h2 className='line-clamp-1 text-xl font-semibold '>{movie.title}</h2>
          <button className='text-3xl text-red-500 hover:scale-110 transition duration-200'
                  onClick={e => handleDeleteFromList(e)}>
            <CiCircleRemove />
          </button>
        </div>
        <div className='object-cover relative rounded-lg bg-cover bg-gradient-to-r from-cyan-500 to-blue-500
                        w-52  h-48 '>
          <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title} poster`}
                 fill priority loading='eager' sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw' />
        </div>
        <div className='p-2'>
          <p className='line-clamp-2 text-lg'>{movie.overview}</p>
          <div className='flex justify-between mt-0.5'>
            {movie.release_date}
            <div className='flex items-center'>
              {movie.vote_count} <BiLike className='mr-2 ml-0.5' />
              {movie.vote_average} <BiStar className='ml-0.5' />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

