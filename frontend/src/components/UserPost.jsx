import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions'

const UserPost = () => {
    const [like,setLike]=useState(false);
  return (
    <>
      <Link to={"/mark/post/1"}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png" />
            <Box w="2px" h={"full"} bg="gray.light" my={5}></Box>
            <Box position={"relative"} w={"full"}>
              <Avatar
                size="xs"
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
              <Avatar
                size="xs"
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
                position={"absolute"}
                bottom={"0px"}
                right="-5px"
                padding={"2px"}
              />
              <Avatar
                size="xs"
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
                position={"absolute"}
                bottom={"0px"}
                left="4px"
                padding={"2px"}
              />
            </Box>
          </Flex>
          <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  mark
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text fontStyle={"sm"} color={"gray.light"}>
                  1d
                </Text>
                <BsThreeDots />
              </Flex>
            </Flex>
            <Text fontSize={'sm'}>This is my firest post</Text>
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                <Image src='/post1.png' w={'full'}/> 
            </Box>
            <Flex gap={3} my={1}>
                <Actions like={like} setLike={setLike}/>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default UserPost;
