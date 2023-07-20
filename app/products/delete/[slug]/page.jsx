'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DeleteProduct = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/products');
  };

  return (
    <>
      <h1>Do you really want to delete product X?</h1>
      <button type='button'>Yes</button>
      <button type='button' onClick={goBack}>NO</button>
    </>
  );
};

export default DeleteProduct;
