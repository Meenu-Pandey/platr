const express = require('express');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/* GET /api/cart [protected] */
router.get('/',
    authMiddleware.authUserMiddleware,
    cartController.getCart
);

/* POST /api/cart [protected] */
router.post('/',
    authMiddleware.authUserMiddleware,
    cartController.addToCart
);

/* PUT /api/cart/:foodId [protected] */
router.put('/:foodId',
    authMiddleware.authUserMiddleware,
    cartController.updateCartItem
);

/* DELETE /api/cart/:foodId [protected] */
router.delete('/:foodId',
    authMiddleware.authUserMiddleware,
    cartController.removeFromCart
);

/* DELETE /api/cart [protected] */
router.delete('/',
    authMiddleware.authUserMiddleware,
    cartController.clearCart
);

module.exports = router;

