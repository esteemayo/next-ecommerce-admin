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
        setProduct(data.product);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [params.slug]);

  return (
    <div>EditProduct</div>
  );
};

export default EditProduct;
