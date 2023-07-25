'use client';

import { withSwal } from 'react-sweetalert2';
import { useCallback, useEffect, useState } from 'react';

import * as categoryAPI from '@/services/categoryService';

const Categories = ({ swal }) => {
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
      const { _id: categoryId } = editedCategory;
      const { data } = await categoryAPI.updateCategory(categoryId, newCategory);
      setCategories((prev) => prev.map((item) => item._id === categoryId ? { ...item, name: data.name, parent: data.parent } : item));
      setEditedcategory(null);
      setName('');
      setParentCategory('');
      return;
    }

    const { data } = await categoryAPI.createCategory({ ...newCategory });
    setCategories((value) => [data, ...value]);
    setName('');
    setParentCategory('');
  }, [name, parentCategory, editedCategory]);

  const editCategory = useCallback((category) => {
    setEditedcategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }, []);

  const handleDelete = useCallback((category) => {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id: categoryId } = category;
        await categoryAPI.deleteCategory(categoryId);
        setCategories((prev) => ([...prev].filter((item) => item._id !== categoryId)));
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [swal]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoryAPI.getCategories();
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
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value=''>No parent category</option>
            {categories.length > 0 && categories.map((category) => {
              const { _id: id, name } = category;
              return <option key={id} value={id}>{name}</option>
            })}
          </select>
        </div>
        <div>
          <label className='block'>Properties</label>
          <button type='button' className='btn-default text-sm'>
            Add new property
          </button>
        </div>
        <button type='submit' className='btn-primary py-1'>Save</button>
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
                  <button
                    type='button'
                    className='btn-primary'
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));
