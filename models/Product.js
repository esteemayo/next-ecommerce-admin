import slugify from 'slugify';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A product must have a title'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A product must have a description'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    properties: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title, { lower: true });

  const regEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const productWithSlug = await this.constructor.find({ slug: regEx });

  if (productWithSlug.length) {
    this.slug = `${this.slug}-${productWithSlug.length + 1}`;
  }
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
