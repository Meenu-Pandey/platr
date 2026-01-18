const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        if (!foodPartnerId) {
            return res.status(400).json({ 
                message: "Food partner ID is required" 
            });
        }

        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
            .select('-password'); // Exclude password from response
        
        if (!foodPartner) {
            return res.status(404).json({ 
                message: "Food partner not found" 
            });
        }

        const foodItemsByFoodPartner = await foodModel.find({ 
            foodPartner: foodPartnerId 
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner || []
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve food partner. Please try again."
        });
    }
}

module.exports = {
    getFoodPartnerById
};