'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context';
import { ViewProvider } from '@/context';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <ViewProvider>
        <ThemeProvider enableSystem={true} attribute='class'>
          <div className='dark:bg-slate-900 dark:text-gray-200 text-gray-700
      transition-colors duration-300 min-h-screen '>
            {children}
          </div>
        </ThemeProvider>
      </ViewProvider>
    </AuthProvider>
  );
};

