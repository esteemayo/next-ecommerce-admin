'use client';

import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { uploadImage } from '@/services/imageService';
import { createProduct, updateProduct } from '@/services/productService';
import { list } from 'postcss';

const initialState = {
  title: '',
  description: '',
  price: '',
};

const ProductForm = ({ slug, product, images }) => {
  const [files, setFiles] = useState(null);
  const [values, setValues] = useState(initialState);
  const [goToProducts, setGoToProducts] = useState(false);

  const productId = product?._id;
  const { title, description, price } = values;

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const newProduct = {
      ...values,
    };

    if (files) {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'next-ecommerce');

          const res = await uploadImage(data);
          const { url } = res.data;
          return url;
        })
      );
      newProduct.images = list;
    }

    if (productId) {
      await updateProduct(productId, { ...newProduct });
      setGoToProducts(true);
      return;
    }

    await createProduct({ ...newProduct });
    setGoToProducts(true);
  }, [files, values, productId]);

  useEffect(() => {
    slug && setValues({
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
    });
  }, [slug, product]);

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
          value={title}
          placeholder='Product name'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='photos'>Photos</label>
        <div className='mb-2'>
          <label htmlFor='photos' className='w-24 h-24 cursor-pointer flex items-center justify-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-200'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' />
            </svg>
            <span>Upload</span>
          </label>
          <input
            type='file'
            id='photos'
            multiple
            className='hidden'
            onChange={(e) => setFiles(e.target.files)}
          />
          {!images?.length && (
            <div>No photos in this product</div>
          )}
        </div>
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          value={description}
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
          value={price}
          placeholder='Price'
          onChange={handleChange}
        />
      </div>
      <button type='submit' className='btn-primary'>
        {slug ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default ProductForm;
