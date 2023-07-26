import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import getIsAdmin from '@/actions/getIsAdmin';
import Product from '@/models/Product';

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectDB();

    const product = await Product.findOne({ slug });

    if (!product) {
      throw new Error('No product found with the given ID');
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
