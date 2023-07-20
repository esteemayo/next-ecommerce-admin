'use client';

import { useEffect, useState } from 'react';

import ProductForm from '@/components/ProductForm';
import { getProductBySlug } from '@/services/productService';

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProductBySlug(params.slug);
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [params.slug]);

  return (
    <>
      <h1>Edit product</h1>
      <ProductForm product={product} />
    </>
  );
};

export default EditProduct;
