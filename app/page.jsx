'use client';

import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';

const Home = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className='text-blue-900'>
        Hello, {session?.user.email}
      </div>
    </Layout>
  );
};

export default Home;
