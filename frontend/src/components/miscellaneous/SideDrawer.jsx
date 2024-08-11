import React, { useState } from "react";
import { Box, Button, Tooltip,Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, useDisclosure, Input, useToast, Spinner } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import  {useNavigate} from 'react-router-dom';
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import axios from "axios";

const SideDrawer = () =>{
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const { user, setSelectedChat, chats, setChats } = ChatState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const toast = useToast();

    const handleSearch = async () => {
        if(!search){
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
            return;
        }

        try{
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };
            const {data} = await axios.get(`http://localhost:4500/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
            
        }catch(error){
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    }

    const accessChat = async (userId) => {
        try{
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post(`http://localhost:4500/api/chat`,{userId},config);

            if (!Array.isArray(chats)) {
                console.error("Chats is not an array:", chats);
                setChats([]);
            }


            if(!chats.find((c)=>c._id===data._id))setChats([data, ...chats]);
            // console.log(chats);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        }catch(error){
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }

    return(
        <>
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="var(--myyellow)"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="var(--myblack)"
        >
            <Tooltip value="Search Users to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen} _hover={{background: "var(--myblack)", color:"var(--myyellow)"}}>
                    <i className="fas fa-search"></i>
                    <Text display={{base:"none", md:"flex"}} px="4">
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans" style={{color:"var(--myblack)"}}>
                Connectify
            </Text>
            <div>
                <Menu>
                    <MenuButton>
                        <BellIcon fontSize="2xl" color="var(--myblack)" m={1}/>
                    </MenuButton>
                </Menu>
                <Menu>
                    <MenuButton bg="var(--myblack)" _hover={{ bg: "var(--myblack)" }} _active={{ bg: "var(--myblack)" }} as={Button} color="var(--myyellow)" rightIcon={<ChevronDownIcon/>}>
                        <Avatar size='sm' cursor="pointer" name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList  bg="var(--myblack)">
                        <ProfileModal user={user}>
                            <MenuItem bg="var(--myblack)" color="var(--myyellow)">My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider/>
                        <MenuItem bg="var(--myblack)" color="var(--myyellow)" onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay  />
            <DrawerContent bg="var(--myblack)">
                <DrawerHeader color="var(--myyellow)" borderBottomWidth="1px" borderColor="var(--myyellow)">Search Users</DrawerHeader>
                <DrawerBody>
                    <Box display="flex" pb={2}>
                        <Input 
                            placeholder="Search by name or email"
                            mr={2}
                            value={search}
                            color="var(--myyellow)"
                            borderColor="var(--myyellow)"
                            _hover="var(--myyellow)"
                            _focusVisible="var(--myyellow)"
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <Button bg="var(--myyellow)" _hover="var(--myyellow)" _active="var(--myyellow)" onClick={handleSearch}>Go</Button>
                    </Box>
                    {loading?(
                        <ChatLoading/>
                    ):(
                        
                        searchResult?.map((user)=>(
                            <UserListItem 
                            key={user._id}
                            user={user}
                            handleFunction={()=>accessChat(user._id)}
                            />
                        ))
                    )}
                    {loadingChat && <Spinner ml="auto" display="flex" />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    )
}

export default SideDrawer;