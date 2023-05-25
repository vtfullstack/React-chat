const express = require("express");
const router = express.Router();
const ChatModel = require("../../models/ChatModel");
const MessageModel = require("../../models/MessageModel");
// post addMessages
// GetMessages
router.post("/addmessage", async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    return res.status(200).json(result);
  } catch (err) {
    console.log("Error is", err);
    return res.status(500).json(err);
  }
});
router.get("/:chatId", async (req, res) => {
    const {chatId}=req.params;

  try {
    const result=await MessageModel.find({chatId});
    
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
