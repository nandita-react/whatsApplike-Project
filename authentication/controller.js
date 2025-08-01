const User = require('../user/repository');
const generateToken = require('../utils/generateToken');
const auth = require('../utils/generateOtp');
const handler = require('../handler');
const { request, response } = require('express');

// exports.sendOtp = async (request, response) => {
//     try {

//         const { phoneNumber } = request.body;
//         const { hashedOtp,otp } = await auth.generateSecureOtp(phoneNumber);
//         handler.successResponse(response, {hashedOtp,otp}, 'OTP create successfully');
//     }
//     catch (error) {
//         handler.errorResponse(response, error);
//     }

// }

// exports.verifyOtp = async (req, res) => {
//     try {
//         const { phoneNumber, otp, hashedOtp } = req.body;

//         await auth.verifyOtp({ otp, hashedOtp });

//         const userRepo = new User(req);
//         let user = await userRepo.findbyPhone(phoneNumber);

//         if (!user) {

//             return handler.successResponse(res,{ mode: "register" }, " Please Registered Atfast ");
//         }
//         return handler.successResponse(res, { user, mode: "login" }, "Please Login Atfast");

//     } catch (err) {
//         return handler.errorResponse(res, err, 'OTP verification failed');
//     }
// };

exports.sendOtp = async (request, response) => {
    try {
        const { phoneNumber } = request.body;

        const result = await auth.sendOtp(`+91${phoneNumber}`);
        console.log("result", request)// ensure +91 or country code is passed
        const sid = result?.sid;

        return handler.successResponse(response, { sid, phoneNumber }, 'OTP create successfully');
    }
    catch (error) {
        return handler.errorResponse(response, error);
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const result = await auth.verifyOtp(`+91${phoneNumber}`, otp);

        // ✔ Correct logic: status should be 'approved' for success
        if (result.status !== 'approved') {
            throw new Error("OTP verification failed");
        }

        const userRepo = new User(req);
        let user = await userRepo.findbyPhone(phoneNumber);

        if (!user) {

            return handler.successResponse(res, { mode: "register" }, " Please Registered Atfast ");
        }
        return handler.successResponse(res, { user, mode: "login" }, "Please Login Atfast");

    } catch (err) {
        return handler.errorResponse(res, err);
    }
};



exports.registerUser = async (req, res) => {
    const userRepo = new User(req);

    try {
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
            req.body.image = { url: imageUrl };
        }
        const user = await userRepo.create();
        const token = generateToken(user);
        return handler.createdResponse(res, { user, token }, "User Create Successfully")
    }
    catch (error) {
        return handler.errorResponse(res, error)
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