'use client';

import { useEffect, useState } from 'react';
import { getProductBySlug } from '@/services/productService';

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState({});

  return (
    <div>EditProduct</div>
  );
};

export default EditProduct;
