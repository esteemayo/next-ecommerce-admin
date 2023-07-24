'use client';

import { useCallback, useEffect, useState } from 'react';
import { createCategory, getCategories } from '@/services/categoryService';

const Categories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await createCategory({ name });
    setName('');
  }, [name]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    })();
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
            value={name}
            placeholder='Category name'
            className='mb-0'
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn-primary py-1'>Save</button>
        </div>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <th>Category name</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map((item) => {
            const { _id: id, name } = item;
            return (
              <tr key={id}>
                <td>{name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Categories;
