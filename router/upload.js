const express=require("express");
const routes=express.Router();

const upload=require("../middleware/upload");

routes.post("/",upload.single("file"),(req,res)=>{

    const fileUrl=`/uploads/${req.file.filename}`

    res.status(200).json({
    url: fileUrl,
    type: req.file.mimetype,
    name: req.file.originalname,
  });
})
module.exports=routes