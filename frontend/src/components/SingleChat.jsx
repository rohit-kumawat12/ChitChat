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

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const { user, selectedChat, setSelectedChat} = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

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
            console.log(messages);
            setLoading(false);
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

    useEffect(()=>{
        fetchMessages();
    },[selectedChat]);

    const sendMessage = async (event) => {
        if(event.key==="Enter" && newMessage){
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
                console.log(data);
                setMessages([...messages, data]);
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
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
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
                    color="gray.500"
                    w="100%"
                    display="flex"
                    justifyContent={{base:"space-between"}}
                    alignItems="center"

                >
                    <IconButton
                        display={{base:"flex", md:"none"}}
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
                        <Input 
                            variant="filled"
                            bg="white"
                            color="var(--myblack)"
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