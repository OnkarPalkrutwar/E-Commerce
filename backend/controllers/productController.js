const Product = require('../models/Product');

/**
 * @desc    Fetch active products with filtering, search, and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const skip = (page - 1) * limit;

    // Build filter query object
    const filter = { isActive: true };

    // Search query
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    // Category filter (matches mainCategory or specific category)
    if (req.query.category && req.query.category !== 'All') {
      filter.$or = [
        { mainCategory: new RegExp(`^${req.query.category}$`, 'i') },
        { category: new RegExp(`^${req.query.category}$`, 'i') }
      ];
    }

    // Gender filter
    if (req.query.gender && req.query.gender !== 'All') {
      filter.$or = [
        { gender: new RegExp(`^${req.query.gender}$`, 'i') },
        { gender: 'Unisex' }
      ];
    }

    // Brand filter
    if (req.query.brand && req.query.brand !== 'All') {
      filter.brand = new RegExp(`^${req.query.brand}$`, 'i');
    }

    // Size filter
    if (req.query.size && req.query.size !== 'All') {
      filter.$or = [
        { 'variants.size': req.query.size },
        { availableSizes: req.query.size }
      ];
    }

    // Color filter
    if (req.query.color && req.query.color !== 'All') {
      filter.$or = [
        { 'variants.color': new RegExp(req.query.color, 'i') },
        { availableColors: new RegExp(req.query.color, 'i') }
      ];
    }

    // Price range filter
    if (req.query.priceMin || req.query.priceMax) {
      filter.price = {};
      if (req.query.priceMin) filter.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) filter.price.$lte = Number(req.query.priceMax);
    }

    // Sale filter (items with discount/original price)
    if (req.query.sale === 'true') {
      filter.originalPrice = { $exists: true, $gt: 0 };
    }

    // Sort order
    let sort = {};
    if (req.query.sortBy === 'price-asc') sort.price = 1;
    else if (req.query.sortBy === 'price-desc') sort.price = -1;
    else if (req.query.sortBy === 'rating-desc') sort.rating = -1;
    else if (req.query.sortBy === 'newest') sort.createdAt = -1;
    else sort.createdAt = -1; // Default newest first

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit) || 1,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

/**
 * @desc    Fetch single product by MongoDB ObjectId
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid product ID format' });
    }
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

/**
 * @desc    Fetch single product by unique slug
 * @route   GET /api/products/slug/:slug
 * @access  Public
 */
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found with specified slug' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product by slug', error: error.message });
  }
};

/**
 * @desc    Create new product (Admin Only)
 * @route   POST /api/admin/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      mainCategory,
      gender,
      brand,
      description,
      price,
      originalPrice,
      images,
      variants,
      availableSizes,
      availableColors,
      badge,
      isBestSeller,
      isNewArrival
    } = req.body;

    // Validate required fields
    if (!name || !price || !brand || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required product fields' });
    }

    // Auto-generate slug if not explicitly provided
    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingProduct = await Product.findOne({ slug: generatedSlug });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product slug already exists. Please provide a unique slug.' });
    }

    const product = new Product({
      name,
      slug: generatedSlug,
      category,
      mainCategory: mainCategory || 'Shoes',
      gender: gender || 'Unisex',
      brand,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
      variants: Array.isArray(variants) ? variants : [],
      availableSizes: availableSizes || (variants ? [...new Set(variants.map(v => v.size))] : []),
      availableColors: availableColors || (variants ? [...new Set(variants.map(v => v.color))] : []),
      badge: badge || '',
      isBestSeller: Boolean(isBestSeller),
      isNewArrival: Boolean(isNewArrival)
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

/**
 * @desc    Update existing product (Admin Only)
 * @route   PATCH /api/admin/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

/**
 * @desc    Soft-delete product by setting isActive = false (Admin Only)
 * @route   DELETE /api/admin/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: 'Product deactivated successfully (Soft deleted)' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to deactivate product', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
};
