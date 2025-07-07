const express=require('express');

const routes=express.Router();
const chatController=require("../chat/controller")
const auth=require("../middleware/auth")

routes.post("/chats", auth, chatController.create);
routes.get("/chats",auth,chatController.getUserChats);

module.exports=routes;