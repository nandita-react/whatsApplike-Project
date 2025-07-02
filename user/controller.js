const Repository = require('./repository');
const handler = require('../handler');




exports.getProfile = async (req, res) => {
    const userRepo = new Repository(req);

    try {
        const user = await userRepo.findById(req.params.id);
        return handler.successResponse(res, user, "Profile fetch successful");
    }
    catch (error) {
        return handler.errorResponse(res, error);
    }
}


