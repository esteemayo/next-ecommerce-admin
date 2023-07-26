import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import getIsAdmin from '@/actions/getIsAdmin';
import Category from '@/models/Category';

export const PATCH = async (request, { params }) => {
  const { id: categoryId } = params;
  const body = await request.json();

  try {
    await connectDB();
    const isAdmin = await getIsAdmin();

    if (!categoryId || typeof categoryId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (isAdmin) {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        { $set: { ...body } },
        {
          runValidators: true,
          new: true,
        },
      );

      if (!category) {
        return NextResponse.json('No category found with the given ID', {
          status: 404,
        });
      }

      return NextResponse.json(category, {
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
  const { id: categoryId } = params;

  try {
    await connectDB();
    const isAdmin = await getIsAdmin();

    if (!categoryId || typeof categoryId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (isAdmin) {
      const category = await Category.findByIdAndDelete(categoryId);

      if (!category) {
        return NextResponse.json('No category found with the given ID', {
          status: 404,
        });
      }

      return NextResponse.json(category, {
        status: 200,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
