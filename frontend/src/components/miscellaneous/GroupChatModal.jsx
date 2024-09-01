import React, { useState, useEffect } from "react";
import { FormControl, useDisclosure, Input, useToast, Box } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
  import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
 
const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

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

    const handleSubmit = async () => {
      if(!groupChatName || !selectedUsers){
        toast({
          title: "Please fill all the fields",
          description: "Please ensure all fields are filled",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position:"top"
        });
        return;
      }
      try{
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            },
        };
        const {data} = await axios.post(`http://localhost:4500/api/chat/group`,{
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
          },config);
          
        setChats([data, ...chats]);
        onClose();

        toast({
          title: "Group Chat Created Successfully",
          status: "success",
          duration: 5000,
          isClosable: "true",
          position: "bottom"
        });
      }catch(error){
        toast({
          title: "Failed to Create the Group",
          description: error.responce.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
      })
    }
  }

  useEffect(() => {
    console.log("at group create:", chats);
}, [chats]);

    const handleDelete = (deletUser) => {
      setSelectedUsers(selectedUsers.filter((sel) => sel._id!==deletUser._id))
    }

    const handleGroup = (userToAdd) => {
      if(selectedUsers.includes(userToAdd)){
        toast({
          title: "User Already Added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position:"top"  
        });
        return;
      }
      setSelectedUsers([...selectedUsers, userToAdd]);
    }

    return(
        <>
        <span onClick={onOpen}>{children}</span>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="var(--myyellow)">
            <ModalHeader
                fontSize="35px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
            >
                Create Group Chat
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControl>
              <Input placeholder="Chat Name" mb={3} onChange={(e)=> setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users.." mb={1} onChange={(e)=> handleSearch(e.target.value)}/>
            </FormControl>
            <Box
              display="flex"
              w="100%"
              flexWrap="wrap"
            >
              {selectedUsers.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
              ))}
            </Box>
            {loading ? <div>Loading...</div> : (
              searchResult?.slice(0,4).map(user => (
                <UserListItem key={user._id} user={user} handleFunction={()=> handleGroup(user)}/>
              ))
            ) }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default GroupChatModal;