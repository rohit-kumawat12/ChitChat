import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";


const Login = () =>{

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);

    const handleLogin = () => {
        
    }

    return(
        <VStack spacing='5px'>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Email..'
                    onChange={(e)=>setEmail(e.target.value)}
                    color={'--var(myblack)'}
                    sx={{ borderColor: '--var(myblack)' }}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder='Enter Password..'
                        onChange={(e)=>setPassword(e.target.value)}
                        color={'--var(myblack)'}
                        sx={{ borderColor: '--var(myblack)' }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" bg={"var(--myblack)"} color={'var(--mywhite)'} _hover={{ color: '--var(myblack)' }}
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
            >
                Login
            </Button>
        </VStack>
    )
}

export default Login