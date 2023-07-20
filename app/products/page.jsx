'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getProducts } from '@/services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <div>
      <Link
        className='bg-blue-900 text-white rounded-md py-1 px-2'
        href='/products/new'
        passHref
      >
        Add new product
      </Link>
      <table className='basic mt-2'>
        <thead>
          <tr>
            <th>Product name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            const { _id: id, title, description, price } = item;
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>
                  <Link href={`/products/${encodeURIComponent(id)}`} passHref>
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
