import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Box,
    useToast,
    FormControl,
    Input,
    Button,
    ModalFooter,
    Spinner
  } from '@chakra-ui/react';
  import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleRemove = async (user1) => {
        if(selectedChat.groupAdmin._id !== user._id && user1._id!==user._id){
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            }); 
            return;
         }

         try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put(`http://localhost:4500/api/chat/removefromgroup`,{
                chatID: selectedChat._id,
                userID: user1._id
            },config);
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
         } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            setLoading(false);
         }


    }

    const handleRename = async () => {
        if(!groupChatName) return;

        try{
            setRenameLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${user.token}`   
                    },   
                };
                console.log(selectedChat._id);
                console.log(groupChatName);
                const { data } = await axios.put(`http://localhost:4500/api/chat/renamegroup`,{
                    chatID: selectedChat._id,
                    chatName: groupChatName

                }, config);
                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false);
        }catch(error){
            toast({
                title: "Failed to rename the group",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
                });
                setRenameLoading(false);
        }

        setGroupChatName("");


    }

    const handleSearch = async (query) => {
        setSearch(query);
        if(!query){
          return;
        }
  
        try{
          setLoading(true);
  
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
            position:"bottom-left"
          });
        }
      }

      const handleAddUser = async (user1) => {
         if(selectedChat.users.find((u) => u._id === user1._id)){
            toast({
                title: "User Already Added",
                description: "User is already a part of the chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            return;
         }

         if(selectedChat.groupAdmin._id !== user._id){
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            }); 
            return;
         }

         try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put(`http://localhost:4500/api/chat/addToGroup`,{
                chatID: selectedChat._id,
                userID: user1._id
            },config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
         } catch (error) {
            toast({
                title: "Failed to add user",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            setLoading(false);
         }
      }

    return(
        <>
        <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
        />
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="var(--myyellow)">
            <ModalHeader
                fontSize="35px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
            >
                {selectedChat.chatName}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              w="100%"
              flexWrap="wrap"
            >
              {selectedChat.users.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u)}/>
              ))}
            </Box>
            <FormControl
                display="flex"
            >
                <Input 
                    placeholder="Chat Name"
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                    variant="solid"
                    colorScheme="teal"
                    ml={1}
                    isLoading={renameLoading}
                    onClick={handleRename}
                >
                    Update
                </Button>

            </FormControl>
            <FormControl>
              <Input placeholder="Add Users.." mb={1} onChange={(e)=> handleSearch(e.target.value)}/>
            </FormControl>
            {loading?(
                <Spinner size="lg" />
            ):(
                searchResult?.map((user) => (
                    <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={()=>handleAddUser(user)}
                    />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=> handleRemove(user)} colorScheme="red">
                Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    );
}

export default UpdateGroupChatModal;