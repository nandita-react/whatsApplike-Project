const express = require('express');
const router = express.Router();

const messageController = require('../message/controller');
const auth=require('../middleware/auth');
// Send a message
router.post('/send',auth, messageController.send);

// Edit a message
router.patch('/edit/:editId', messageController.edit);

// Hard delete a message
router.delete('/delete/:deleteId',auth, messageController.delete);

// Soft delete a message (hide for user)
router.patch('/soft-delete/:softdeleteId',auth, messageController.softDelete);

// Get all messages (optional filters via query string)
router.get('/all', messageController.getAll);

module.exports = router;