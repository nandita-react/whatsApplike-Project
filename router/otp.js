const express=require("express");

const routes=express.Router();

const otpController=require("../authentication/controller");
const upload=require("../middleware/upload")

routes.post("/send-otp",otpController.sendOtp);
routes.post("/verify-otp",otpController.verifyOtp);

routes.post("/create",upload.single('image'),otpController.registerUser)
routes.post("/login",otpController.logInUser);


module.exports=routes;