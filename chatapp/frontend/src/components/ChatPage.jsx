import { ChatState } from "../context/ChatProvider";
import SideDrawer from "./miscellaneous/SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return(
        <div style={{width:"100%"}}>
            {user && <SideDrawer/>}
            <Box style={{display:"flex",justifyContent:"space-between",width:"100%",height:"91.5vh",padding:"10px"}}>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage;