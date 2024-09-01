import React from "react";
import Join from "./components/join/Join.jsx";
import './App.css';
import Homepage from "./components/Homepage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import ChatProvider from './context/ChatProvider';
import { Route, Routes } from "react-router-dom";

function App(){

    return (
        <div className="mainContainer">
            <ChatProvider>
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