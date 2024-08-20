
import { Inter } from 'next/font/google';
import './globals.css';
import ToasterProvider from '@/providers/ToasterProvider';
import Navbar from '@/app/components/nav/Navbar';
import { UserContextProvider } from '@/context/UserContext';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToasterProvider />
        <UserContextProvider>
          <Navbar />
          <main className='container mx-auto px-5 pt-10'>
            {children}
          </main>
        </UserContextProvider>
      </body>
    </html>
  );
}
