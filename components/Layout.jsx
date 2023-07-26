'use client';

import { useCallback, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Logo from './Logo';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  const toggleHandler = useCallback((e) => {
    e.stopPropagation();
    setShowNav((value) => !value);
  }, []);

  if (!session) {
    return (
      <div className='bg-bgGray w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-bgGray min-h-screen'>
      <div className='md:hidden flex items-center p-4'>
        <button onClick={toggleHandler}>
          {showNav ? (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path fillRule='evenodd' d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z' clipRule='evenodd' />
            </svg>
          )}
        </button>
        {!showNav && (
          <div className='flex grow justify-center mr-6'>
            <Logo />
          </div>
        )}
      </div>
      <div className='flex'>
        <Sidebar show={showNav} />
        <div className='flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
