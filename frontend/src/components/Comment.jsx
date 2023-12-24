import { Avatar, Flex, useRangeSlider } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import {Text } from '@chakra-ui/layout';


const comment = ({reply}) => {
    const [like,setLike]=useState(false);
  return (
   <>
    <Flex gap={4} py={2} w={'full'}>
        <Avatar src={reply.userProficPic} size={'sm'}/>
        <Flex gap={1} w={'full'} flexDirection={'column'}>
           <Flex w={'full'} justifyContent={'space-between'} alignItems='center'>
               <Text fontSize={'sm'} fontWeight='bold'>{reply.username}</Text>
               <Flex gap={2} alignItems={'center'}>
                
               </Flex>
            </Flex> 
            <Text>{reply.text}</Text>
            
        </Flex>
    </Flex>
   </>
  )
}

export default comment