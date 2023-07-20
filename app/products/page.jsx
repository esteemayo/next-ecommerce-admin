'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getProducts } from '@/services/productService';

const Products = () => {
  return (
    <div>
      <Link
        className='bg-blue-900 text-white rounded-md py-1 px-2'
        href='/products/new'
        passHref
      >
        Add new product
      </Link>
    </div>
  );
};

export default Products;
