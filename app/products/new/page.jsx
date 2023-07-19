import { useSate } from 'react';

const NewProduct = () => {
  return (
    <div>
      <h1>New Product</h1>
      <div>
        <label htmlFor='name'>Product name</label>
        <input type='text' id='name' placeholder='Product name' />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea id='description' placeholder='Description' />
      </div>
      <div>
        <label htmlFor='price'>Price (in USD)</label>
        <input id='price' type='number' placeholder='Price' />
      </div>
      <button type='submit' className='btn-primary'>Save</button>
    </div>
  );
};

export default NewProduct;
