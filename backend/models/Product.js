const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'SKU is required for each product variant'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Size is required for variant'],
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Color is required for variant'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Stock count is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  }
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    mainCategory: {
      type: String,
      enum: ['Shoes', 'Clothing', 'Accessories'],
      default: 'Shoes'
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex'],
      default: 'Unisex'
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative']
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative']
    },
    images: {
      type: [String],
      required: [true, 'At least one image URL is required'],
      validate: [arr => arr.length > 0, 'Product must have at least one image']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 12
    },
    badge: {
      type: String,
      default: ''
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    variants: [variantSchema],
    availableSizes: [String],
    availableColors: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    // Explicitly set the collection name to 'products' as required
    collection: 'products',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for search optimization
productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
