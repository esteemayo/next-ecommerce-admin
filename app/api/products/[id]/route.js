import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import Product from '@/models/Product';

export const GET = async (request, { params }) => {
  const { id: productId } = params;

  try {
    await connectDB();

    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid ID');
    }

    const product = await Product.findById(productId);

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
