const express=require('express');

const router=express.Router();

router.use("/users",require("./user"));
router.use("/groups",require("./group"))
router.use("/message",require("./message"))
router.use("/reports",require("./report"))
router.use("/auth",require("./otp"));
router.use("/chat",require("./chat"))

module.exports=router;