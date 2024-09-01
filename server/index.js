// const http = require("http");
const express = require("express");
const cors = require("cors");
// const socketIO = require("socket.io");
require('dotenv').config();
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
const port = process.env.PORT || 4500;
connectDB();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Working");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, console.log(`Server is working on ${port}`));

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000',
    }
});

io.on("connection", (socket)=>{
    console.log("Connected to socket.io");
    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("User Joined Room : "+room);
    });

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        
        if (!chat.users) return console.log("chat.users not defined");
        
        try{
            chat.users.forEach((user) => {
                if (user._id == newMessageReceived.sender._id) return;
                socket.in(user).emit("message received", newMessageReceived);
              });
        }catch(error){
            console.log(error);
        }
    
        
      });

    socket.off("setup",()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});