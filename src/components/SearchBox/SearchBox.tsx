'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export const SearchBox = () => {

  const [searchVal, setSearchVal] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchVal) {
      return;
    }
    router.push(`/search/${searchVal}`);
  };

  return (
    <form className='flex justify-around mx-6' onSubmit={handleSubmit}>
      <label className='relative block w-2/4'>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          <FiSearch className='text-black text-lg dark:text-white' />
        </span>
        <input
          className='placeholder:italic block bg-white w-full border-b
            border-slate-300  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-b-sky-500
             sm:text-lg dark:bg-transparent flex-1' onChange={e => setSearchVal(e.target.value)}
          placeholder='Search for anything...' type='text' name='search' />
      </label>
      <button disabled={!searchVal} type='submit' className='text-amber-500 disabled:text-gray-400 text-xl'>
        Search
      </button>
    </form>
  );
};

