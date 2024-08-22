import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "../components/SingleChat";

const ChatBox = ({fetchAgain, setFetchAgain}) => {
    const { selectedChat } = ChatState();
    return(
        <Box
            display={{base: selectedChat ? "flex" : "none", md: "flex"}}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="var(--myyellow)"
            w={{base: "100%", md: "68%"}}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox;