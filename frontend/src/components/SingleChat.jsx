import React, { useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, FormControl, IconButton, Spinner, Text, Input, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useState } from "react";
import axios from "axios";
import ScrollableChat from "../components/ScrollableChat";
import io from "socket.io-client";
import loadingIcon from "../images/loadingIcon.webm";

const ENDPOINT = "http://localhost:4500";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toast = useToast();

    const fetchMessages = async () => {
        if(!selectedChat)return;
        try{
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);
            const  {data} = await axios.get(`http://localhost:4500/api/message/${selectedChat._id}`,config);
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        }catch(error){
            toast({
                title : "Error",
                description : "Failed to Load the Messages",
                status : "error",
                duration : 5000,
                isClosable : true,
                position: "bottom"
            });
        }
    };

    const sendMessage = async (event) => {
        if(event.key==="Enter" && newMessage){
            socket.emit("stop typing", selectedChat._id);
            try{
                const config = {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                // const messageToSend = newMessage;
                setNewMessage("");
                const {data} = await axios.post(
                    "http://localhost:4500/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                
                setMessages([...messages, data]);
                socket.emit("new message",data);
            }catch(error){
                toast({
                    title: "Error Occured",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;

        // eslint-disable-next-line
    },[selectedChat]);

    useEffect(()=>{
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
              if (!notification.includes(newMessageReceived)) {
                setNotification([newMessageReceived, ...notification]);
                setFetchAgain(!fetchAgain);
              }
            } else {
              setMessages([...messages, newMessageReceived]);
            }
          });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        if(!socketConnected)return;
        if(!typing){
            setTyping(true);
            socket.emit("typing",selectedChat._id);
        }

        let lastTyping = new Date().getTime();
        var timerLength = 3000;
        setTimeout(()=>{
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTyping;

            if(timeDiff >= timerLength && typing){
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }

    return(
        <>
        {selectedChat?(
            <>
                <Text
                    fontSize={{ base: '28px', md: '30px' }}
                    pb={3}
                    px={2}
                    fontFamily="Work sans"
                    color="var(--myblack)"
                    w="100%"
                    display="flex"
                    justifyContent={{base:"space-between"}}
                    alignItems="center"

                >
                    <IconButton
                        display={{base:"flex", md:"none"}}
                        bg="white"
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ? (
                        <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
                        </>
                    ):(
                        <>
                        {selectedChat.chatName.toUpperCase()}
                        <UpdateGroupChatModal
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                            fetchMessages={fetchMessages}
                        />
                        </>
                    )}
                </Text>
                <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="white"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {loading?(
                        <Spinner 
                            size="xl"
                            w={20}
                            h={20}
                            alignSelf="center"
                            margin="auto"
                            color="var(--myblack)"
                        />
                    ):(
                        <div className="messages">
                            <ScrollableChat messages={messages} />
                        </div>
                    )}

                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        {isTyping?(<div style={{color:"black"}}>
                            <video
                                src={loadingIcon}
                                autoPlay
                                loop
                                muted
                                style={{ width: "50px", height: "50px" }} // Adjust size as needed
                            />
                        </div>):(<></>)}
                        <Input 
                            variant="filled"
                            bg="white"
                            color="var(--myblack)"
                            borderColor="var(--myblack)"
                            _hover="var(--myblack)"
                            _focusVisible="var(--myblack)"
                            placeholder="Enter a message.."
                            autoComplete="off"
                            onChange={typingHandler}
                            value={newMessage}
                        />
                    </FormControl>
                </Box>
            </>
        ):(
            <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="var(--myblack)">
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
        </>
    );
}

export default SingleChat;