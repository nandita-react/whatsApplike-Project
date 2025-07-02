const User = require('./schema');

class userRepository {
    constructor(request) {
        this.requestBody = request?.body;
    }

    async create() {
        const user = new User(this.requestBody);
        return await user.save();
    }

    async findbyPhone(phNumber) {
        return await User.findOne({ phoneNumber: phNumber })
    }

    async findById(id) {
        return await User.findById(id);
    }

    async updateData(id) {
        await this.findById(id);
        return await User.findByIdAndUpdate(id, this.requestBody, { new: true })
    }

    async updateStatus(id) {
        return await User.findByIdAndUpdate(id, { isOnline: this.requestBody.isOnline || false }, { new: true })
    }

}

module.exports = userRepository;