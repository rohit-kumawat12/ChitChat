import React, { useState } from "react";
import './join.css';
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}

const Join = () => {

    const [name, setName] = useState("");

    return(
        <>
            <div className="joinPage">
                <div className="joinContainer">
                    {/* <div className="joinLogo"> */}
                        <img src={logo} alt="logo" />
                        <h1>Chatify</h1>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="joinInput" id="joinInput" placeholder="Enter your name.."/>
                        <Link onClick={(event)=> !name ? event.preventDefault(): null}  className="joinLink" to="/chat"><button onClick={sendUser}>Login</button></Link>
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}

export default Join;
export {user};