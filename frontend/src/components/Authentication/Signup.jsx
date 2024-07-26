import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import  {useNavigate} from 'react-router-dom';

const Signup = () =>{

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [picdetails, setPicdetails] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();
    
    const postDetails = (pics) =>{
        setLoading(true);
        if(pics === undefined){
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chitchat");
            data.append("cloud_name","dzlibjhzh");
            fetch("https://api.cloudinary.com/v1_1/dzlibjhzh/image/upload",{
                method: "post",
                body: data,
            }).then((res)=> res.json()).then(data=>{
                setPic(data.url.toString());
                setLoading(false);
                console.log(data);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }else{
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
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

    const handleSignup = async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
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
        if(password!==confirmpassword){
            toast({
                title: 'Password do not match',
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
                    "Content-Type": "application/json",
                }
            };
            const {data} = await axios.post("http://localhost:4500/api/user",{name,email,password,pic},config);
            toast({
                title: 'Registration Successful',
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
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup