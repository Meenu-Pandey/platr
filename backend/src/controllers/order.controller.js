const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');
const foodModel = require('../models/food.model');

async function placeOrder(req, res) {
    try {
        let { foodPartnerId, items } = req.body; // items can be provided directly or from cart
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        let orderItems = [];
        let totalAmount = 0;

        // If items provided directly (buy now flow)
        if (items && Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                const food = await foodModel.findById(item.foodId);
                if (!food) {
                    return res.status(404).json({
                        message: `Food item ${item.foodId} not found`
                    });
                }

                orderItems.push({
                    food: food._id,
                    quantity: item.quantity || 1,
                    price: food.price || 0,
                    name: food.name
                });

                totalAmount += (food.price || 0) * (item.quantity || 1);
            }

            // Get foodPartnerId from first item if not provided
            if (!foodPartnerId && items[0].foodId) {
                const firstFood = await foodModel.findById(items[0].foodId);
                if (firstFood && firstFood.foodPartner) {
                    foodPartnerId = firstFood.foodPartner.toString();
                }
            }
        } else {
            // Get items from cart (cart checkout flow)
            const cart = await cartModel.findOne({ user: user._id })
                .populate('items.food');

            if (!cart || !cart.items || cart.items.length === 0) {
                return res.status(400).json({
                    message: "Cart is empty"
                });
            }

            for (const cartItem of cart.items) {
                const food = cartItem.food;
                orderItems.push({
                    food: food._id,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    name: food.name
                });

                totalAmount += cartItem.price * cartItem.quantity;

                if (!foodPartnerId && food.foodPartner) {
                    foodPartnerId = food.foodPartner.toString();
                }
            }

            // Clear cart after order
            cart.items = [];
            cart.totalAmount = 0;
            await cart.save();
        }

        if (!foodPartnerId) {
            return res.status(400).json({
                message: "Food partner ID is required"
            });
        }

        // Create order
        const order = await orderModel.create({
            user: user._id,
            foodPartner: foodPartnerId,
            items: orderItems,
            totalAmount: totalAmount,
            status: 'pending'
        });

        const populatedOrder = await orderModel.findById(order._id)
            .populate('foodPartner', 'name address phone')
            .populate('items.food', 'name description price video');

        res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to place order. Please try again."
        });
    }
}

async function getUserOrders(req, res) {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const orders = await orderModel.find({ user: user._id })
            .populate('foodPartner', 'name address phone')
            .populate('items.food', 'name description price video')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders: orders || []
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve orders. Please try again."
        });
    }
}

async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const order = await orderModel.findOne({
            _id: orderId,
            user: user._id
        })
            .populate('foodPartner', 'name address phone')
            .populate('items.food', 'name description price video');

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order retrieved successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve order. Please try again."
        });
    }
}

module.exports = {
    placeOrder,
    getUserOrders,
    getOrderById
};

