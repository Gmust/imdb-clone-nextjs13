'use client';
import { useTheme } from 'next-themes';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export const ThemeSwitch = () => {

  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className='text-2xl   cursor-pointer hover:text-amber-500'>
      {mounted &&
        (currentTheme === 'light' ?
            (<BsMoon onClick={() => setTheme('dark')} />)
            :
            (<BsSun onClick={() => setTheme('light')} />)
        )
      }
    </div>
  );
};

