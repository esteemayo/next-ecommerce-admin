'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { deleteProduct, getProductBySlug } from '@/services/productService';

const DeleteProduct = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState({});

  const goBack = useCallback(() => {
    router.push('/products');
  }, [router]);

  const handleDelete = useCallback(async (e) => {
    e.stopPropagation();

    await deleteProduct(product._id);
    goBack();
  }, [product, goBack]);

  useEffect(() => {
    params.slug && (async () => {
      try {
        const { data } = await getProductBySlug(params.slug);
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [params]);

  return (
    <>
      <h1 className='text-center'>
        Do you really want to delete product
        &nbsp;&quot;{product?.title}&quot;?
      </h1>
      <div className='flex justify-center gap-2'>
        <button
          type='button'
          className='btn-red'
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          type='button'
          onClick={goBack}
          className='btn-default'
        >
          NO
        </button>
      </div>
    </>
  );
};

export default DeleteProduct;
