'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className='text-blue-900 flex justify-between'>
      <h2>Hello, <b>{session?.user?.name}</b></h2>
      <div className='flex align-middle gap-1 bg-gray-300 text-black rounded-lg overflow-hidden'>
        <Image
          src='https://randomuser.me/api/portraits/thumb/men/32.jpg'
          width={6}
          height={6}
          alt=''
          className='relative w-6 h-6'
        />
        <span className='px-2'>
          John Doe
          {session?.user?.name}
        </span>
      </div>
    </div>
  );
};

export default Home;
