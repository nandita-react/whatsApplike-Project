const express = require('express');
const router = express.Router();

const messageController = require('../message/controller');
const auth=require('../middleware/auth');
const routes = require('./chat');
// Send a message
// router.post('/send',auth, messageController.send);

// // Edit a message
// router.patch('/edit/:editId', messageController.edit);

// // Hard delete a message
// router.delete('/delete/:deleteId',auth, messageController.delete);

// // Soft delete a message (hide for user)
// router.patch('/soft-delete/:softdeleteId',auth, messageController.softDelete);

// Get all messages (optional filters via query string)

router.post("/",auth,messageController.createMessage);
router.get("/getMessage/:chatId",messageController.getMessagesByChat)

router.patch("/:id",messageController.editMessage);
router.delete("/:messageId",auth,messageController.deleteMessageForUser)

router.post("/:messageId",auth,messageController.reactToMessage);
router.delete("/:messageId/reaction",auth,messageController.removeReaction)

router.patch("/:messageId/forward/:chatId",auth,messageController.forwardMessage)





module.exports = router;