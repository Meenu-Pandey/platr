const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/* POST /api/order [protected] */
router.post('/',
    authMiddleware.authUserMiddleware,
    orderController.placeOrder
);

/* GET /api/order [protected] */
router.get('/',
    authMiddleware.authUserMiddleware,
    orderController.getUserOrders
);

/* GET /api/order/:orderId [protected] */
router.get('/:orderId',
    authMiddleware.authUserMiddleware,
    orderController.getOrderById
);

module.exports = router;

