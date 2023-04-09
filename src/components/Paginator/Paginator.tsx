'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { chunkArray } from '@utils/chunkCreator/chunkCreator';

interface PaginatorParams {
  searchTerm: Category | string,
  page: number,
  totalPages: number,
}

export const Paginator = ({ searchTerm, page, totalPages }: PaginatorParams) => {

  const [chunk, setChunk] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
  }, [page]);

  const pages = [];


  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  const chunks = chunkArray(pages, totalPages / 20);

  const handleChangeChunk = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (chunk === chunks.length) {
        return chunk;
      } else {
        setChunk(chunk + 1);
      }
    }
    if (direction === 'prev') {
      if (chunk === 0) {
        return chunk;
      } else {
        setChunk(chunk - 1);
      }
    }
  };

  const handleChangePage = (p: number) => {
    if (!searchTerm) {
      router.push(`/search/${searchTerm}`);
    } else {
      router.push(`?genre=${searchTerm}&page=${p}`);
    }
  };


  return (
    <div className='flex items-center justify-center space-x-3 mb-2'>
      {chunks.length > 0 && <AiOutlineDoubleLeft className='text-2xl text-fuchsia-500  cursor-pointer'
                                                 onClick={() => handleChangeChunk('prev')} />}
      <AiOutlineArrowLeft className='cursor-pointer text-blue-500 ' onClick={() => handleChangePage(+page - 1)} />
      {
        chunks.length > 0 ?
          chunks[chunk].map(p =>
            <div key={p}
                 className={`text-xl cursor-pointer select-none ${p === page ? 'text-amber-500' : 'text-white'}`}
                 onClick={() => {
                   page = p;
                   handleChangePage(p);
                 }}>
              {p}
            </div>
          )
          :
          pages.map(p =>
            <div key={p}
                 className={`text-xl cursor-pointer select-none ${p === page ? 'text-amber-500' : 'text-white'}`}
                 onClick={() => {
                   page = p;
                   handleChangePage(p);
                 }}>
              {p}
            </div>
          )
      }
      <AiOutlineArrowRight className='cursor-pointer text-blue-500  ' onClick={() => handleChangePage(+page + 1)} />
      {chunks.length > 0 && <AiOutlineDoubleRight className='text-2xl text-fuchsia-500 cursor-pointer'
                                                  onClick={() => handleChangeChunk('next')} />}
    </div>
  );
};

