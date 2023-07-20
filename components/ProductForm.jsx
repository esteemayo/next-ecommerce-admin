'use client';

import { redirect } from 'next/navigation';
import { useCallback, useState } from 'react';

import { createProduct } from '@/services/productService';

const ProductForm = ({ product }) => {
  const [goToProducts, setGoToProducts] = useState(false);
  const [values, setValues] = useState({
    title: product.title || '',
    description: product.description || '',
    price: product.price || '',
  });

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await createProduct({ ...values });
    setGoToProducts(true);
  }, [values]);

  if (goToProducts) {
    return redirect('/products');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Product name</label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Product name'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          placeholder='Description'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='price'>Price (in USD)</label>
        <input
          id='price'
          name='price'
          type='number'
          placeholder='Price'
          onChange={handleChange}
        />
      </div>
      <button type='submit' className='btn-primary'>Save</button>
    </form>
  );
};

export default ProductForm;
