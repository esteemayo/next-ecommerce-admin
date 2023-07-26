import slugify from 'slugify';
import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import getIsAdmin from '@/actions/getIsAdmin';
import Product from '@/models/Product';

export const GET = async (request, { params }) => {
  const { id: productId } = params;

  try {
    await connectDB();
    const isAdmin = await getIsAdmin();

    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (isAdmin) {
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error('No product found with the given ID');
      }

      return NextResponse.json(product, {
        status: 200,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { id: productId } = params;

  const body = await request.json();
  const {
    title,
    description,
    price,
    images,
    category,
    properties,
  } = body;

  try {
    await connectDB();
    const isAdmin = await getIsAdmin();

    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid ID');
    }

    const updatedProduct = {
      title,
      description,
      price,
      images,
      category,
      properties,
    };

    if (title) updatedProduct.slug = slugify(title, { lower: true });

    if (isAdmin) {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: { ...updatedProduct } },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!product) {
        return NextResponse.json('No product found with the given ID', {
          status: 404,
        });
      }

      return NextResponse.json(product, {
        status: 200,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { id: productId } = params;

  try {
    await connectDB();

    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid ID');
    }

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return NextResponse.json('No product found with the given ID', {
        status: 404,
      });
    }

    return NextResponse.json('Product deleted successfully', {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
