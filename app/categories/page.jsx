'use client';

import { useCallback, useState } from 'react';

const Categories = () => {
  const [name, setName] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>New category name</label>
        <div className='flex gap-1'>
          <input
            id='name'
            type='text'
            placeholder='Category name'
            className='mb-0'
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn-primary py-1'>Save</button>
        </div>
      </form>
    </>
  );
};

export default Categories;
