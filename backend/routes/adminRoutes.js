const express = require('express');
const router = express.Router();
const { getAdminDashboard, getAllOrders } = require('../controllers/adminController');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// All admin endpoints require authentication AND admin role
router.use(protect, admin);

router.get('/dashboard', getAdminDashboard);
router.get('/orders', getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus);

router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
