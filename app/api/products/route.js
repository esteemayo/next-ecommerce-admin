import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import Product from '@/models/Product';

export const POST = async (request) => {
  const body = await request.json();

  const { title, description, price } = body;

  const newProduct = {
    title,
    description,
    price,
  };

  try {
    await connectDB();
    const product = await Product.create({ ...newProduct });

    if (product) {
      return NextResponse.json(product, {
        status: 201,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
