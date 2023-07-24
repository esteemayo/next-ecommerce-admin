'use client';

import { useCallback } from 'react';

const Categories = () => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <h1>Categories</h1>
      <label htmlFor='name'>New category name</label>
      <div className='flex gap-1'>
        <input
          id='name'
          type='text'
          placeholder='Category name'
          className='mb-0'
        />
        <button type='submit' className='btn-primary py-1'>Save</button>
      </div>
    </>
  );
};

export default Categories;
