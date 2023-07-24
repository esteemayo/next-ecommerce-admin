'use client';

import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ReactSortable } from 'react-sortablejs';

import Input from './inputs/Input';
import TextArea from './inputs/Textarea';

import { uploadImage } from '@/services/imageService';
import { createProduct, updateProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';

import Spinner from './Spinner';

const initialState = {
  title: '',
  description: '',
  price: '',
};

const ProductForm = ({ slug, product, images: existingImages }) => {
  const [files, setFiles] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
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
      setIsUploading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'next-ecommerce');

          const res = await uploadImage(data);
          const { url } = res.data;
          setImages((prev) => [...prev, ...url]);
          setIsUploading(false);
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

  const updateImagesOrder = useCallback((images) => {
    setImages(images);
  }, []);

  useEffect(() => {
    slug && setValues({
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
    });

    // slug && setImages(existingImages || []);
  }, [slug, product, existingImages]);

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

  if (goToProducts) {
    return redirect('/products');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name='title'
        label='Product name'
        value={title}
        placeholder='Product name'
        onChange={handleChange}
      />
      <label>Category</label>
      <select name='' id=''>
        <option value=''>Uncategorized</option>
        {categories.length > 0 && categories.map((category) => {
          const { _id: id, name } = category;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      <div>
        <label htmlFor='photos'>Photos</label>
        <div className='mb-2 flex flex-wrap gap-1'>
          <ReactSortable
            list={images}
            setList={updateImagesOrder}
            className='flex flex-wrap gap-1'
          >
            {!!images?.length && images.map((item, index) => {
              <div key={index} className='h-24'>
                <Image src={item} alt='' className='rounded-lg' />
              </div>
            })}
          </ReactSortable>
          {isUploading && (
            <div className='h-24 flex items-center'>
              <Spinner />
            </div>
          )}
          <label htmlFor='photos' className='w-24 h-24 cursor-pointer flex items-center justify-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-200'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' />
            </svg>
            <span>Upload</span>
          </label>
          <Input
            type='file'
            name='photos'
            multiple
            className='hidden'
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
      </div>
      <TextArea
        name='description'
        label='Description'
        value={description}
        placeholder='Description'
        onChange={handleChange}
      />
      <Input
        name='price'
        type='number'
        label='Price (in USD)'
        value={price}
        placeholder='Price'
        onChange={handleChange}
      />
      <button type='submit' className='btn-primary'>
        {slug ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default ProductForm;
