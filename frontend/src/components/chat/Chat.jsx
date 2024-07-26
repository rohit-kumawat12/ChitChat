import React, { useEffect } from "react";
import {user} from "../join/Join.jsx";
import socketIo from "socket.io-client";
import "./chat.css";
import sendImg from '../../images/send.png';

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {

    const socket = socketIo(ENDPOINT, {transports: ['websocket']});

    useEffect(() => {
        socket.on('connect', () => {
            alert("connected");
        })

        socket.emit('joined',{user})

        return () => {

        }
    }, [])

    return(
        <div className="chatPage">
            <div className="chatContainer">
                <div className="chatHeader"></div>
                <div className="chatBox"></div>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button className="sendBtn">
                        <img src={sendImg} alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;