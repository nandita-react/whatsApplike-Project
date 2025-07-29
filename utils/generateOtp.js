 const axios = require("axios");
require("dotenv").config(); // load .env variables

const API_KEY = process.env.TWO_FACTOR_API_KEY; // from your .env file
console.log("Loaded API KEY:", API_KEY);

exports.sendOtp = async (phoneNumber) => {
  const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${phoneNumber}/AUTOGEN`;
    const response = await axios.get(url);
    return response.data;
  
};

exports.verifyOtp = async (sessionId, otp) => {
  const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;

  
    const response = await axios.get(url);
    return response.data;
  
};