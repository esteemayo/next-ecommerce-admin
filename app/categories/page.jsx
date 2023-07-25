'use client';

import { withSwal } from 'react-sweetalert2';
import { useCallback, useEffect, useState } from 'react';

import * as categoryAPI from '@/services/categoryService';

const Categories = ({ swal }) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setProperties((prev) => [...prev, { name: '', values: '' }]);
  }, []);

  const handlePropertyNameChange = useCallback((index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }, []);

  const handlePropertyValuesChange = useCallback((index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }, []);

  const handleRemoveProperty = useCallback((propertyIndex) => {
    setProperties((prev) =>
      [...prev].filter((_, index) => index !== propertyIndex)
    );
  }, []);

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
      setEditedCategory(null);
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
    setEditedCategory(category);
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

  const handleCancel = useCallback(() => {
    setEditedCategory(null);
    setName('');
    setParentCategory();
  }, []);

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
        <div className='mb-2'>
          <label className='block'>Properties</label>
          <button
            type='button'
            onClick={handleClick}
            className='btn-default text-sm mb-2'
          >
            Add new property
          </button>
          {properties.length > 0 && properties.map((item, index) => {
            const { name, values } = item;
            return (
              <div key={index} className='flex gap-1 mb-2'>
                <input
                  type='text'
                  value={name}
                  className='mb-0'
                  placeholder='property name (example: color)'
                  onChange={(e) => handlePropertyNameChange(index, item, e.target.value)}
                />
                <input
                  type='text'
                  value={values}
                  className='mb-0'
                  placeholder='values, comma separated'
                  onChange={(e) => handlePropertyValuesChange(index, item, e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => handleRemoveProperty(index)}
                  className='btn-default'
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div className='flex gap-1'>
          {editedCategory && (
            <button
              type='button'
              className='btn-default'
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button type='submit' className='btn-primary py-1'>
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
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
      )}
    </>
  );
};

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));
