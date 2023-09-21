import User from "../models/User.js"
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from "../utils/error.js";
export const register = async (req, res, next) => {
    try {
        const salt = await bycrypt.genSalt(10)
        const hash = await bycrypt.hash(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password:hash
        })
        await newUser.save()
        res.status(200).send('User has been created')
    } catch (err) {
        next(err)
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user)
            return next(createError(404, 'User not found!'))
        const isPassCorrect = await bycrypt.compareSync(req.body.password, user.password)
        if (!isPassCorrect)
            return next(createError(400, 'Wrong password or username!'))
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET)
        const { password, isAdmin, ...other } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({details:{ ...other }, isAdmin});
    } catch (err) {
        next(err)
    }
}