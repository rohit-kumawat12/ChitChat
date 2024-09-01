import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import  {useNavigate} from 'react-router-dom';


const Login = () =>{

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    const handleLogin = async() => {
        setLoading(true);

        if(!email || !password){
            toast({
                title: 'Please Fill all the Feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            
            const {data} = await axios.post('http://localhost:4500/api/user/login', {email, password}, config);

            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");

        }catch(error){
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong!';
            toast({
                title: 'Error Occured!',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            console.log(error.message);
        }
    }

    return(
        <VStack spacing='5px'>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Email..'
                    color="var(--myblack)"
                    borderColor="var(--myblack)"
                    _hover="var(--myblack)"
                    _focusVisible="var(--myblack)"
                    onChange={(e)=>setEmail(e.target.value)}
                    sx={{ borderColor: '--var(myblack)' }}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder='Enter Password..'
                        color="var(--myblack)"
                        borderColor="var(--myblack)"
                        _hover="var(--myblack)"
                        _focusVisible="var(--myblack)"
                        onChange={(e)=>setPassword(e.target.value)}
                        sx={{ borderColor: '--var(myblack)' }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" bg={"var(--myblack) !important"} color={'var(--mywhite)'} _hover={{ color: '--var(myblack)' }}
                        onClick={()=>setShow(!show)}>
                            {show?"Hide":"Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                width="100%"
                bg={"var(--myblack)"} color={'var(--mywhite)'}
                _hover={{ color: '--var(myblack)'}}
                onClick={handleLogin}
                isLoading={loading}
            >
                Login
            </Button>
        </VStack>
    )
}

export default Login