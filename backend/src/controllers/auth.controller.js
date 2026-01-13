const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hashedPaasword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPaasword
    })

    const token = jwt.sign({
        id: user._id,
    }, "26a17812d3ed2de254818729dad7b970")
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}