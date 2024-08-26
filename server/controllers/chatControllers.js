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
        Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
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

const createGroupChat = asyncHandler(async (req, res) =>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please Fill all the feilds"});
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        return res.status(400).send("More then 2 users are required to form a group chat");
    }

    users.push(req.user);
    
    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password").populate("groupAdmin","-password");

        res.status(200).send(fullGroupChat);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroup = asyncHandler(async (req, res) => {
    const { chatID, chatName} = req.body;

    const updateGroup = await Chat.findByIdAndUpdate(
        chatID,{
            chatName,
        },
        {
            new:true,
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!updateGroup){
        res.status(400);
        throw new Error("Chat Not Found");
    }else{
        res.json(updateGroup);
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatID, userID } = req.body;
    const user = await User.findById(userID);
    const chat = await Chat.findById(chatID);
    if(!user || !chat){
        res.status(400);
        throw new Error("User or Chat Not Found");
    }

    if(chat.users.includes(user)){
        res.status(400);
        throw new Error("User is already in the chat");
    }

    const added = await Chat.findByIdAndUpdate(
        chatID,
        {
            $push: {users: userID}
        },
        {
            new: true
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!added){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.json(added);
    }
});

const removeFromGroup = asyncHandler(async(req, res) => {
    const { chatID, userID } = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatID,
        {
            $pull: {users: userID}
        },
        {
            new: true
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!removed){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.json(removed);
    }
});

module.exports = {accessChats, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup};