const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const accessChats = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId){
        return res.sendStatus(400);
    }

    var isChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
            ]
    }).populate("users", "-password").populate("latestMessage");

    if (isChat) {
        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email"
        });
        res.send(isChat);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try{
            var createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users", "-password");
            res.status(200).send(fullChat);
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = asyncHandler(async(req, res)=>{
    try{
        Chat.findOne({users:{$elemMatch:{$eq: req.user._id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updateddAt: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            });

            res.status(200).send(results);
        });
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {accessChats, fetchChats};