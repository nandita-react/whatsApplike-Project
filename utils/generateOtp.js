 const CryptoJS = require("crypto-js");

const SECRET_KEY = "your-secret-key"; 


async function generateSecureOtp(phoneNumber) {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

  const combined = { otp, phoneNumber, expiresAt };

  const hashedOtp = CryptoJS.AES.encrypt(JSON.stringify(combined), SECRET_KEY).toString();

  return {otp, hashedOtp };  
}


async function verifyOtp({ otp, hashedOtp }) {
  try {
   
    const bytes = CryptoJS.AES.decrypt(hashedOtp, SECRET_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const { phoneNumber, expiresAt, otp: originalOtp } = decrypted;

    if (Date.now() > new Date(expiresAt).getTime()) {
      return { success: false, message: "OTP expired" };
    }

    if (otp !== originalOtp) {
      return { success: false, message: "Invalid OTP" };
    }

    return { success: true, phoneNumber };
  } catch (err) {
    return { success: false, message: "OTP verification failed or corrupted" };
  }
}

module.exports = { generateSecureOtp, verifyOtp };