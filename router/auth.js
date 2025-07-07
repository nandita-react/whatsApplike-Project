const express=require("express");

const routes=express.Router();

const authController=require("../authentication/controller");
const upload=require("../middleware/upload")

routes.post("/send-otp",authController.sendOtp);
routes.post("/verify-otp",authController.verifyOtp);

routes.post("/register",upload.single('image'),authController.registerUser)
routes.post("/login",authController.logInUser);


module.exports=routes;