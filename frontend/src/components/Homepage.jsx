import { Container, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import logo from "../images/logo.png";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            navigate('/chats');
        }
    }, [navigate]);

    return (
        <Container className="mainContainer" maxW='xl' centerContent>
            <Box className="homeContainer" bg={"var(--myyellow)"} w="100%" p={4} color={"var(--myblack)"}>
                    <img src={logo} alt="logo" />
                    <h1>ChitChat</h1>
                <Tabs variant='soft-rounded' colorScheme={"var(--myblack)"} width={"100%"}>
                    
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                    <TabList>
                        <Tab className="homebtn1" width={"50%"}>Login</Tab>
                        <Tab className="homebtn1" width={"50%"}>Sign Up</Tab>
                    </TabList>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage; 