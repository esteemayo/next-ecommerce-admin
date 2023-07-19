'use client';

import { signIn, useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';

const Home = () => {
  const { data: session } = useSession();

  // if (!session) {
  //   return (
  //     <div className='bg-blue-900 w-screen h-screen flex items-center'>
  //       <div className='text-center w-full'>
  //         <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>
  //           Login with Google
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className='bg-blue-900 min-h-screen'>
      <Sidebar />
      <div>Logged in {session?.user.email}</div>
    </div>
  );
};

export default Home;
