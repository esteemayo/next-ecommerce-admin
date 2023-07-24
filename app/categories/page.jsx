'use client';

import { useCallback, useEffect, useState } from 'react';
import { createCategory, getCategories, updateCategory } from '@/services/categoryService';

const Categories = () => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedcategory] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const newCategory = {
      name,
      parent: parentCategory,
    };

    if (editedCategory) {
      const categoryId = editedCategory._id;
      const { data } = await updateCategory(categoryId, newCategory);
      setCategories((prev) => prev.map((item) => item._id === categoryId ? { ...item, data } : item));
      setEditedcategory(null);
      setName('');
      setParentCategory('');
      return;
    }

    const { data } = await createCategory({ ...newCategory });
    setCategories((value) => [data, ...value]);
    setName('');
  }, [name, parentCategory, editedCategory]);

  const editCategory = useCallback((category) => {
    setEditedcategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }, []);

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
        <label htmlFor='name'>
          {editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}
        </label>
        <div className='flex gap-1'>
          <input
            id='name'
            type='text'
            value={name}
            placeholder='Category name'
            className='mb-0'
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className='mb-0'
          >
            <option value=''>No parent category</option>
            {categories.length > 0 && categories.map((category) => {
              const { _id: id, name } = category;
              return <option key={id} value={id}>{name}</option>
            })}
          </select>
          <button type='submit' className='btn-primary py-1'>Save</button>
        </div>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <th>Category name</th>
            <th>Parent category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map((item) => {
            const { _id: id, name, parent } = item;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{parent?.name ?? 'nil'}</td>
                <td>
                  <button
                    type='button'
                    className='btn-primary mr-1'
                    onClick={() => editCategory(item)}
                  >
                    Edit
                  </button>
                  <button type='button' className='btn-primary'>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Categories;
