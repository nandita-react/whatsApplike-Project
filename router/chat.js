const express=require('express');

const routes=express.Router();
const chatController=require("../chat/controller")
const auth=require("../middleware/auth")

routes.post("/chats", auth, chatController.createChat);
routes.get("/allchats",auth,chatController.getUserChats);

module.exports=routes;