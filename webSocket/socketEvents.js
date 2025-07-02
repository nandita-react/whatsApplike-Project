const userStatusHandler=require("./userStatus");
const messageEvents=require("./messageEvents");
const groupEvents=require("./groupEvents")

module.exports=(io,socket)=>{
  userStatusHandler(io,socket);
  messageEvents(io,socket);
  groupEvents(io,socket);
};