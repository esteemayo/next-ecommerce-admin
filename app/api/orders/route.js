import { NextResponse } from 'next/server';

import Order from '@/models/Order';
import connectDB from '@/utils/db';

export const GET = async (request) => {
  try {
    await connectDB();

    const orders = await Order.find().sort('-createdAt');

    return NextResponse.json(orders, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
