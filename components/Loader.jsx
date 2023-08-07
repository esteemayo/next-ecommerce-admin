'use client';

import { HashLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <HashLoader
        size={50}
        color='#5542f6'
        speedMultiplier={false}
      />
    </div>
  );
};

export default Loader;
