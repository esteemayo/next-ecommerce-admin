import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'A category must have a name'],
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    properties: {
      type: [
        { type: Object },
      ],
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'parent',
    select: 'name',
  });

  next();
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
