'use client';

const Categories = () => {
  return (
    <>
      <h1>Categories</h1>
      <label htmlFor="name">New category name</label>
      <div className='flex gap-1'>
        <input
          type='text'
          placeholder='Category name'
          className='mb-0'
        />
        <button className='btn-primary py-1'>Save</button>
      </div>
    </>
  );
};

export default Categories;
