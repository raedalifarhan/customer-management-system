"use client"
import { UserContext } from '@/context/UserContext';
import Logo from './Logo';
import Link from 'next/link';
import { useContext } from 'react';
import { Button } from 'flowbite-react/components/Button';
import { setupFsCheck } from 'next/dist/server/lib/router-utils/filesystem';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('jwt')
    router.push('/')
  }

  return (
    <header
      className='
        text-2xl
        sticky
        z-50 top-0 
        flex items-center justify-between gap-5
        px-5
        bg-sky-900 
        text-slate-200
        shadow-md
        bg-opacity-90
        backdrop-blur-md
        h-[80px]
        '
    >
      <Logo />
      <div>
        <Link href="/customers">Customers</Link>
      </div>

      <div className='flex flex-row items-center gap-5'>
        { user ? (
          <>
            <span className='text-slate-200'>{user?.displayName}</span>
            <Button className='outline p-3 rounded-md' onClick={logout} >Logout</Button>
          </>
        ) : (
          <>
            <Link className='outline p-3 rounded-md' href='/login'>Login</Link>
            <Link className='outline p-3 rounded-md' href='/register'>Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
