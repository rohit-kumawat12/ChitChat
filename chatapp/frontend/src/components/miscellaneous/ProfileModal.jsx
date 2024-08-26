import React from "react";
import { IconButton, useDisclosure, Image, Text } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <>
        {children?(<span onClick={onOpen}>{children}</span>):(
            <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )}
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="var(--myyellow)">
            <ModalHeader
                fontSize="40px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
            >
                {user.name}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image 
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
            />
            <Text
                fontSize={{base:"28px", md:"30px"}}
                fontFamily="Work sans"
                marginBottom="5%"
            >
                {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
        </>
    )


}

export default ProfileModal;