const express=require('express');

const routes=express.Router();

const userController=require("../user/controller");



routes.get("/profile",userController.getProfile);



module.exports=routes