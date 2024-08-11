import { Stack, Skeleton } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
    return(
        <Stack>
            <Skeleton height='58px' />
            <Skeleton height='58px' />
            <Skeleton height='58px' />
            <Skeleton height='58px' />
            <Skeleton height='58px' />
            <Skeleton height='58px' />
            <Skeleton height='58px' />
        </Stack>
    );
}

export default ChatLoading;