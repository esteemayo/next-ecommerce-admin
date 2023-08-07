'use client';

import { useEffect, useState } from 'react';

const ClientOnly = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div>ClientOnly</div>
  );
};

export default ClientOnly;
