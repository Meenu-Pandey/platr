const cartModel = require('../models/cart.model');
const foodModel = require('../models/food.model');

async function getCart(req, res) {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        let cart = await cartModel.findOne({ user: user._id })
            .populate('items.food', 'name description price video foodPartner');

        if (!cart) {
            cart = await cartModel.create({
                user: user._id,
                items: [],
                totalAmount: 0
            });
        }

        res.status(200).json({
            message: "Cart retrieved successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve cart. Please try again."
        });
    }
}

async function addToCart(req, res) {
    try {
        const { foodId, quantity = 1 } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({
                message: "Food ID is required"
            });
        }

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({
                message: "Food item not found"
            });
        }

        let cart = await cartModel.findOne({ user: user._id });

        if (!cart) {
            cart = await cartModel.create({
                user: user._id,
                items: [],
                totalAmount: 0
            });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.food.toString() === foodId
        );

        if (existingItemIndex !== -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                food: foodId,
                quantity: quantity,
                price: food.price || 0
            });
        }

        // Recalculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();

        const populatedCart = await cartModel.findById(cart._id)
            .populate('items.food', 'name description price video foodPartner');

        res.status(200).json({
            message: "Item added to cart successfully",
            cart: populatedCart
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add item to cart. Please try again."
        });
    }
}

async function updateCartItem(req, res) {
    try {
        const { foodId } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Valid quantity is required"
            });
        }

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const cart = await cartModel.findOne({ user: user._id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.food.toString() === foodId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        cart.items[itemIndex].quantity = quantity;

        // Recalculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();

        const populatedCart = await cartModel.findById(cart._id)
            .populate('items.food', 'name description price video foodPartner');

        res.status(200).json({
            message: "Cart item updated successfully",
            cart: populatedCart
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update cart item. Please try again."
        });
    }
}

async function removeFromCart(req, res) {
    try {
        const { foodId } = req.params;
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const cart = await cartModel.findOne({ user: user._id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.food.toString() !== foodId
        );

        // Recalculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();

        const populatedCart = await cartModel.findById(cart._id)
            .populate('items.food', 'name description price video foodPartner');

        res.status(200).json({
            message: "Item removed from cart successfully",
            cart: populatedCart
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to remove item from cart. Please try again."
        });
    }
}

async function clearCart(req, res) {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const cart = await cartModel.findOne({ user: user._id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];
        cart.totalAmount = 0;

        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to clear cart. Please try again."
        });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};

