import mongoose from 'mongoose';
import clientPromise from '@/lib/mongodb';

const connectDB = async () => {
  try {
    await mongoose.connect(clientPromise.url);
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

export default connectDB;
