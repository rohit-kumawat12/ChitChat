import React from "react";
// import socketIO from "socket.io-client";
// import Navbar from "./components/Navbar";
import Join from "./components/join/Join.jsx";
import './App.css';
// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import ChatProvider from './context/ChatProvider';
import { Route, Routes } from "react-router-dom";

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Homepage />,
//     },
//     {
//       path: "/chats",
//       element: <ChatPage />,
//     },
//     {
//       path: "/test",
//       element: <Join />,
//     },
//   ]);


function App(){

    return (
        <div className="mainContainer">
            {/* <Navbar/> */}
            <ChatProvider>
            {/* <RouterProvider router={router} /> */}
            
            <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/chats" element={<ChatPage />} />
                    <Route path="/test" element={<Join />} />
            </Routes>
            </ChatProvider>
        </div>
    );
}

export default App;