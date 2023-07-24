import { NextResponse } from 'next/server';

import connectDB from '@/utils/db';
import Category from '@/models/Category';

export const POST = async (request) => {
  const { name } = await request.json();

  try {
    await connectDB();

    const category = await Category.create(name);

    if (category) {
      return NextResponse.json(category, {
        status: 201,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
