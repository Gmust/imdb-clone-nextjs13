'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcPrevious, FcNext } from 'react-icons/fc';

interface PaginatorParams {
  searchTerm: Category | string,
  page: number,
  totalPages: number,
}

export const Paginator = ({ searchTerm, page, totalPages }: PaginatorParams) => {

  const router = useRouter();

  useEffect(() => {
  }, [page]);

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  ///tests
  const handleChangePage = (p: number) => {
    if (!searchTerm) {
      router.push(`/search/${searchTerm}`);
    } else {
      router.push(`?genre=${searchTerm}&page=${p}`);
    }
  };

  return (
    <div className='flex items-center justify-center space-x-3 mb-2'>
      <FcPrevious className='cursor-pointer ' onClick={() => handleChangePage(+page - 1)} />
      {pages.map(p =>
        <div key={p} className={`text-xl cursor-pointer select-none ${p === page ? 'text-amber-500' : 'text-white'}`}
             onClick={() => {
               handleChangePage(p);
             }}>
          {p}
        </div>
      )}
      <FcNext className='cursor-pointer ' onClick={() => handleChangePage(+page + 1)} />
    </div>
  );
};

