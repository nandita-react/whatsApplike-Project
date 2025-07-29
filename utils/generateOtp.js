const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SERVICE_ID = process.env.TWILIO_SERVICE_SID;

exports.sendOtp = async (phoneNumber) => {
    const verification = await client.verify.v2
        .services(SERVICE_ID)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

    return verification; // includes sid and status
};

exports.verifyOtp = async (phoneNumber, otp) => {
    const verification_check = await client.verify.v2
        .services(SERVICE_ID)
        .verificationChecks.create({ to: phoneNumber, code: otp });

    return verification_check; // includes status
};
