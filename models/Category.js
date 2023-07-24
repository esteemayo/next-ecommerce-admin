import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A category must have a name'],
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
