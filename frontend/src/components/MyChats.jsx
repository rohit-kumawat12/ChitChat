import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import {getSender} from "../config/ChatLogics";
import GroupChatModal from  "./miscellaneous/GroupChatModal";

const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState();
    const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try{
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("http://localhost:4500/api/chat",config);
            if (Array.isArray(data)) {
                setChats(data);
            } else if (data) {
                setChats([data]);
            } else {
                setChats([]);
            }
        }catch(error){
            toast({
                title:"Error Occured!",
                description:"Failed to Load the chats",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain])
    return(
        <Box
            display={{base:selectedChat ? "none" : "flex",md:"flex"}}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="var(--myyellow)"
            w={{base:"100%",md:"31%"}}
            borderRadius="1g"
            borderWidth="1px"
            borderColor="var(--myyellow)"
        >
            <Box
                pd={3}
                px={3}
                mb={2}
                fontSize={{base:"24px", md:"26px"}}
                // fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                color="var(--myblack)"
            >
                My Chats
                <GroupChatModal>
                <Button
                    display="flex"
                    fontSize={{base:"17px",md:"10px",lg:"17px"}}
                    bg="var(--myblack)"
                    color="var(--myyellow)"
                    _hover={{
                        bg:"var(--myblack)",
                        color:"var(--myyellow)"
                    }}
                    rightIcon={<AddIcon />}
                >
                    New Group Chat
                </Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="white"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats.length > 0 ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat)=>(
                            <Box
                                onClick={()=> setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "var(--myblack)" : "#E8E8E8"}
                                color={selectedChat === chat ? "var(--myyellow)" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                            <Text>
                                {!chat.isGroupChat? getSender(loggedUser, chat.users) :(chat.chatName)}
                            </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                ) }
            </Box>
        </Box>
    )
}

export default MyChats;