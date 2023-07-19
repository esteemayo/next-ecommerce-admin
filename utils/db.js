import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

export default connect;
