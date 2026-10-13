const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

/**
 * @desc    Get dashboard statistics for admin panel
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
const getAdminDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    // Calculate revenue from non-cancelled orders
    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueResult.length > 0 ? Number(revenueResult[0].totalRevenue.toFixed(2)) : 0;

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve admin dashboard stats', error: error.message });
  }
};

/**
 * @desc    Get all orders for administrative management
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve admin orders', error: error.message });
  }
};

module.exports = {
  getAdminDashboard,
  getAllOrders
};
