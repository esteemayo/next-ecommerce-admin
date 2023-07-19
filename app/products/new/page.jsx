'use client';

import { useCallback, useState } from 'react';
import { createProduct } from '@/services/productService';

const initialState = {
  title: '',
  description: '',
  price: '',
};

const NewProduct = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await createProduct({ ...values });
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Product</h1>
      <div>
        <label htmlFor='name'>Product name</label>
        <input
          type='text'
          id='name'
          placeholder='Product name'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          placeholder='Description'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='price'>Price (in USD)</label>
        <input
          id='price'
          type='number'
          placeholder='Price'
          onChange={handleChange}
        />
      </div>
      <button type='submit' className='btn-primary'>Save</button>
    </form>
  );
};

export default NewProduct;
