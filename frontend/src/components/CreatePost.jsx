import React, { useRef } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {BsFillImageFill} from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useParams } from 'react-router-dom';
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import postsAtom from '../atoms/postAtom';
import usePreviewImg from "../hooks/usePreviewImage";
import { set } from 'mongoose';
const MAX_CHAR = 500;
const CreatePost = () => {
  const { username } = useParams();
const { isOpen, onOpen, onClose } = useDisclosure();
const [postText,setPostText]=useState("");
const imageRef = useRef(null);
const [remainingChar,setRemainingChar]=useState(MAX_CHAR);
const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
const user =useRecoilValue(userAtom);
const [posts,setPosts]=useRecoilState(postsAtom);
const handleTextChange = (e) => {   
      const inputText = e.target.value;
      if(inputText.length > MAX_CHAR){
         const truncatedText = inputText.substring(0,MAX_CHAR);
         setPostText(truncatedText);
         setRemainingChar(0);
      }else{
          setPostText(inputText);
          setRemainingChar(MAX_CHAR-inputText.length);
        
      }

}
const handleCreatePost = async () => {
    const res =await fetch("/api/posts/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({postedBy:user._id,text:postText,imageUrl:imgUrl})
    })
    const data = await res.json();
    console.log(data);
    if(data.error){
      console.log(data.error);
      return;
    }
    if(username===user.username){
      setPosts([data,...posts]);
    }
    onClose();
    setPostText("");
    setImgUrl("");
}

  return (
   <>
   <Button 
   position={"fixed"}
   bottom={10}
   right={10}
   leftIcon={<AddIcon/>}
   bg={useColorModeValue("gray.300","gray.dark")} 
   size={{base: "sm", sm:"md",md:"lg"}}

   onClick={onOpen}  >
    Post
   </Button>
   <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea placeholder="Post content goes here.." 
                onChange={handleTextChange} value={postText}/>
                <Text fontSize={'xs'} fontWeight={'bold'}
                textAlign={'right'}
                m={1}
                color={'gray.800'}>
                    {remainingChar}/{MAX_CHAR}
                </Text>
                <Input type={'file'} hidden ref={imageRef} onChange={handleImageChange}/>
                <BsFillImageFill
                style={{marginLeft:'5px',cursor:"pointer"}}
                size={16}
                onClick={()=>imageRef.current.click()}/>
            </FormControl>

            {imgUrl &&(
              <Flex mt={5} w={'full'} justify={'relative'}>
                  <Image src={imgUrl} alt={'preview image'} />
                  <CloseButton onClick={()=>setImgUrl("")}
                  bg={'gray.800'} 
                  position={'relative'} 
                  top={2}
                  right={10}  /> 
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
            }
            

export default CreatePost;