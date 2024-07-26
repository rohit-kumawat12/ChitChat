// const http = require("http");
const express = require("express");
const cors = require("cors");
// const socketIO = require("socket.io");
require('dotenv').config();
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
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

app.use(notFound);
app.use(errorHandler);

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