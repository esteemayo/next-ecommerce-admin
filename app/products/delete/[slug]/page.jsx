'use client';

import { useRouter } from 'next/navigation';

const DeleteProduct = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/products');
  };

  return (
    <div>
      Do you really want to delete product X?
      <button type='button'>Yes</button>
      <button type='button'>NO</button>
    </div>
  );
};

export default DeleteProduct;
