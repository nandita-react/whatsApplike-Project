const MessageRepository = require('./repository');
const handler = require('../handler'); // Custom response handler (adjust path as needed)

exports.createMessage = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const message = await repo.createMessage();
        return handler.successResponse(res, message, "Message created");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.getMessagesByChat = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const messages = await repo.getMessageByChat(req.params.chatId);
        return handler.successResponse(res, messages, "Messages fetched");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.editMessage = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const updated = await repo.editMessage(req.params.id);
        return handler.successResponse(res, updated, "Message updated");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.deleteMessageForUser = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const result = await repo.deleteMessageForUser(req.params.messageId);
        return handler.successResponse(res, result, "Message deleted for user");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.reactToMessage = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
      const message=  await repo.reactMessage(req.params.messageId);
        return handler.successResponse(res, message , "Reaction updated");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.removeReaction = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const updated = await repo.removeReaction(req.params.messageId);
        return handler.successResponse(res, updated, "Reaction removed");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};

exports.forwardMessage = async (req, res) => {
    const repo = new MessageRepository(req);
    try {
        const forwarded = await repo.forwardMessageToChat(req.params.messageId, req.params.chatId);
        return handler.successResponse(res, forwarded, "Message forwarded");
    } catch (err) {
        return handler.errorResponse(res, err);
    }
};
