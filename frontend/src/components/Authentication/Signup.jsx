import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () =>{

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [picdetails, setPicdetails] = useState();
    const [show, setShow] = useState(false);
    
    const postDetails = (pics) =>{

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPicdetails(file.name);
            postDetails(file);
        } else {
            setPicdetails("");
        }
    };

    const handleFileClick = () => {
        document.getElementById('file-input').click();
    };

    const handleSignup = () => {

    }

    return(
        <VStack spacing='5px'>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Name..'
                    onChange={(e)=>setName(e.target.value)}
                    color={'--var(myblack)'}
                    sx={{ borderColor: '--var(myblack)' }}
                />
            </FormControl>

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

            <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder='Confirm Password'
                        onChange={(e)=>setConfirmpassword(e.target.value)}
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

            <FormControl id="pic">
                <FormLabel>Upload Your Profile Picture</FormLabel>
                {/* <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e)=>postDetails(e.target.files[0])}
                    color={'--var(myblack)'}
                    sx={{ borderColor: '--var(myblack)' }}
                /> */}
                    <Input
                    id="file-input"
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={handleFileChange}
                    display="none"
                />
                <Button
                    width="100%"
                    bg='var(--myblack)'
                    color="white"
                    _hover={{ bg: 'var(--myblack)' }}
                    onClick={handleFileClick}
                >
                    {picdetails ? `Selected File: ${picdetails}` : "Choose File"}
                </Button>
            </FormControl>

            <Button
                width="100%"
                bg={"var(--myblack)"} color={'var(--mywhite)'}
                _hover={{ color: '--var(myblack)'}}
                onClick={handleSignup}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup