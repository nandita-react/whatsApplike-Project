const express=require('express');

const routes=express.Router();
const chatController=require("../chat/controller")
const auth=require("../middleware/auth")

routes.post("/one-to-one",auth,chatController.createOneToOneChat);
routes.post("/group",auth,chatController.createChatGroup);
routes.get("/",auth,chatController.getUserChats);
routes.get("/:id",auth,chatController.getChatById);
routes.put("/:id",chatController.updateChatById);
routes.delete("/:id",auth,chatController.deleteChat);
routes.post("/:id/participants", chatController.addParticipants);
routes.delete("/:id/participants/:userId",chatController.removeParticipant);

module.exports=routes;