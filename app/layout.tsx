import './globals.css';
import { Header } from '@components/Header';
import { Providers } from '@/app/Providers';
import { SearchBox } from '@components/SearchBox/SearchBox';

export const metadata = {
  title: 'IMDb clone',
  description: 'IMDb clone powered by next js'
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
    <body>
    <Providers>
      <Header />
      <SearchBox />
      {children}
    </Providers>
    </body>
    </html>
  );
}
