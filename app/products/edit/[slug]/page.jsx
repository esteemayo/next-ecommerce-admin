'use client';

import { useEffect, useState } from 'react';

import ProductForm from '@/components/ProductForm';
import { getProductBySlug } from '@/services/productService';

const EditProduct = ({ params: { slug } }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  return (
    <>
      <h1>Edit product</h1>
      {product && (
        <ProductForm
          slug={slug}
          product={product}
          images={product.images}
        />
      )}
    </>
  );
};

export default EditProduct;
