'use client';

import { HashLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div>
      <HashLoader
        size={50}
        color='#5542f6'
        speedMultiplier={false}
      />
    </div>
  );
};

export default Loader;
