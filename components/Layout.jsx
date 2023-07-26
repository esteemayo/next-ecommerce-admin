'use client';

import { signIn, useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className='bg-gray-200 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-200 min-h-screen flex'>
      <Sidebar />
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
