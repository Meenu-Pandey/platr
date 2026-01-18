const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")
const commentModel = require("../models/comment.model")
const { v4: uuidv4 } = require("uuid")


async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Video file is required"
            });
        }

        if (!req.body.name || !req.body.name.trim()) {
            return res.status(400).json({
                message: "Food name is required"
            });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuidv4());

        const price = req.body.price ? parseFloat(req.body.price) : 0;
        
        const foodItem = await foodModel.create({
            name: req.body.name.trim(),
            description: req.body.description?.trim() || '',
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id,
            price: price >= 0 ? price : 0
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create food. Please try again."
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({})
            .populate('foodPartner', 'name email')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems: foodItems || []
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch food items. Please try again."
        });
    }
}


async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
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

        const foodExists = await foodModel.findById(foodId);
        if (!foodExists) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            });

            return res.status(200).json({
                message: "Food unliked successfully",
                like: false
            });
        }

        await likeModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        });

        res.status(201).json({
            message: "Food liked successfully",
            like: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to like food. Please try again."
        });
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
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

        const foodExists = await foodModel.findById(foodId);
        if (!foodExists) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            });

            return res.status(200).json({
                message: "Food unsaved successfully",
                save: false
            });
        }

        await saveModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        });

        res.status(201).json({
            message: "Food saved successfully",
            save: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to save food. Please try again."
        });
    }
}

async function getSaveFood(req, res) {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const savedFoods = await saveModel.find({ user: user._id })
            .populate('food')
            .populate('food.foodPartner', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods: savedFoods || []
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve saved foods. Please try again."
        });
    }
}

async function addComment(req, res) {
    try {
        const { foodId, text } = req.body;
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

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        const foodExists = await foodModel.findById(foodId);
        if (!foodExists) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const comment = await commentModel.create({
            user: user._id,
            food: foodId,
            text: text.trim()
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { commentsCount: 1 }
        });

        const populatedComment = await commentModel.findById(comment._id)
            .populate('user', 'fullName email');

        res.status(201).json({
            message: "Comment added successfully",
            comment: populatedComment
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add comment. Please try again."
        });
    }
}

async function getComments(req, res) {
    try {
        const { foodId } = req.params;

        if (!foodId) {
            return res.status(400).json({
                message: "Food ID is required"
            });
        }

        const foodExists = await foodModel.findById(foodId);
        if (!foodExists) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        const comments = await commentModel.find({ food: foodId })
            .populate('user', 'fullName email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Comments retrieved successfully",
            comments: comments || []
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve comments. Please try again."
        });
    }
}


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
    addComment,
    getComments
}