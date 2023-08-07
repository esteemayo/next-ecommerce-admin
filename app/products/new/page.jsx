'use client';

import ClientOnly from '@/components/ClientOnly';
import ProductForm from '@/components/ProductForm';

const NewProduct = () => {
  return (
    <ClientOnly>
      <h1>New Product</h1>
      <ProductForm />
    </ClientOnly>
  );
};

export default NewProduct;
