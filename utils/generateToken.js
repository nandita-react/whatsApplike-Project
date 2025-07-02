const jwt=require('jsonwebtoken');

const generateToken=(user)=>{
    const payload=  {
     userId:user._id,
     phoneNumber:user.phoneNumber
    }

    const secret=process.env.JWT_SECRET;

    return jwt.sign(payload,secret,{
        expiresIn:'7d'
    })
}

module.exports=generateToken;