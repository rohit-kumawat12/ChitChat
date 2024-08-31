const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const sendMessage = asyncHandler(async(req, res)=>{
    const {content, chatId} = req.body;
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.status(400);
    }

    var newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId,
    }

    try{
        var message = await  Message.create(newMessage);

        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path:"sender",
            select:"name pic eamil"
        });
        
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message,
        });

        res.json(message);

    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const allMessages = asyncHandler(async (req, res) => {
    try{
        const message = await Message.find({chat: req.params.chatId}).populate(
            "sender",
            "name pic email"
        );
        res.json(message);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {sendMessage, allMessages};