const express = require("express");
const router = express.Router();
const ChatModel = require("../../models/ChatModel");
const UserSchema = require("../../models/UserSchema");
const Users=require("../../models/UserSchema")
router.post("/", async (req, res) => {
  console.log("===",req.params)
 try{
  const chat = await ChatModel.findOne({
    members: { $in: [req.params.firstId, req.params.secondId] },
  });
  console.log("chatchatchat",chat)
  if(chat){
    console.log("chatchat",chat)
    return res.status(500).json({
      message:"User Already Added"
    })
  }
  else{
    const newChat = new ChatModel({
      members: ["640727001121b653b107e06a", "640726581121b653b107e059"],
    });
    try {
      const savechat = await newChat.save();
      return res.status(200).json(savechat);
    } catch (err) {
      console.log("Error is", err);
      return res.status(500).json(err);
    }
  }
 }
 catch(err){
  console.log("Error is",err)
 }
});
router.get("/:userid", async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userid] },
    });
    // const chat = await Users.find();
    // return res.json({
    //   users: users,
    // });
    // const chat=await UserSchema
    return res.status(200).json(chat);
  } catch (err) {
    return res.status(500).json(err);
  }
});
const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
router.get("/find/:firstId/:secondId", findChat);
module.exports = router;
