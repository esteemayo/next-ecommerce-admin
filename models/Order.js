import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    line_items: {
      type: Object,
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'An order must have a name'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'An order must have an email address'],
    },
    city: {
      type: String,
      required: [true, 'An order must have a city'],
    },
    postalCode: {
      type: String,
      required: [true, 'An order must have a postal code'],
    },
    streetAddress: {
      type: String,
      required: [true, 'An order must have a street address'],
    },
    country: {
      type: String,
      required: [true, 'An order must have a country'],
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
