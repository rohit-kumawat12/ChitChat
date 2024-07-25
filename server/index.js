// const http = require("http");
const express = require("express");
const cors = require("cors");
// const socketIO = require("socket.io");
require('dotenv').config();
const { chats } = require("./data/data");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 4500;
connectDB();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Working");
});

app.get("/api/chat",(req,res)=>{
    res.send(chats);
});

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find(c=>c._id === req.params.id);
    res.send(singleChat);
});

app.listen(port, console.log(`Server is working on ${port}`));
// const server = http.createServer(app);

// const io = socketIO(server);

// io.on("connection",(socket)=>{
//     console.log("New Connection");

//     socket.on('joined',({user})=>{
//         console.log(`${user} has joined`);
//     })
// });

// server.listen(port,()=>{
//     console.log(`Server is working on ${port}`);
// });