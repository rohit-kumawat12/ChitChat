import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({user, handleFunction}) => {
    return(
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="var(--myyellow)"
            _hover={{
                background: "var(--myblack)",
                color:"var(--myyellow)"
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
            borderColor="var(--myyellow)"
            borderWidth={1}
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
        
    );
}

export default UserListItem;