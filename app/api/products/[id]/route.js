import slugify from 'slugify';
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

export const PATCH = async (request, { params }) => {
  const { id: productId } = params;
  const body = request.json();

  try {
    await connectDB();

    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (body.title) body.slug = slugify(body.title, { lower: true });

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: { ...body } },
      {
        new: true,
        runValidators: true,
      },
    );

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
