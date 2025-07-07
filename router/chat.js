const express=require('express');

const routes=express.Router();
const chatController=require("../chat/controller")
const auth=require("../middleware/auth")

routes.post("/", auth, chatController.create);
routes.get("/",auth,chatController.getUserChats);

module.exports=routes;