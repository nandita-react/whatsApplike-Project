const User = require('../user/repository');
const generateToken = require('../utils/generateToken');
const auth = require('../utils/generateOtp');
const handler = require('../handler');
const { request, response } = require('express');

exports.sendOtp = async (request, response) => {
    try {

        const { phoneNumber } = request.body;
        const { hashedOtp,otp } = await auth.generateSecureOtp(phoneNumber);
        handler.successResponse(response, {hashedOtp,otp}, 'OTP create successfully');
    }
    catch (error) {
        handler.errorResponse(response, error);
    }

}

exports.verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp, hashedOtp } = req.body;

        await auth.verifyOtp({ otp, hashedOtp });

        const userRepo = new User(req);
        let user = await userRepo.findbyPhone(phoneNumber);

        if (!user) {

            return handler.successResponse(res,{ mode: "register" }, " Please Registered Atfast ");
        }
        return handler.successResponse(res, { user, mode: "login" }, "Please Login Atfast");
    
    } catch (err) {
        return handler.errorResponse(res, err, 'OTP verification failed');
    }
};

exports.registerUser = async (req, res) => {
    const userRepo = new User(req);

    try {
        if (req.file) {
            req.body.image = {
                url: `/upload/${req.file.filename}`
            }
        }
        const user = await userRepo.create();
        const token = generateToken(user);
        return handler.createdResponse(res, { user, token }, "User Create Successfully")
    }
    catch (error) {
        return handler.errorResponse(res,error)
    }
};

exports.logInUser = async (req, res) => {
    const userRepo = new User(req);

    try {
        const user = await userRepo.findbyPhone(req.body.phoneNumber);
        if (!user) return handler.errorResponse(new Error('User not found'), 404);
        const token = generateToken(user);
        return handler.successResponse(res, { user, token }, "login successfully")
    }
    catch (error) {
        return handler.errorResponse(res, error);
    }
}