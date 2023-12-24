import {Text, Box,Flex,VStack, Link } from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import { RiInstagramFill } from 'react-icons/ri';
import {CgMoreO} from 'react-icons/cg'
import React from 'react';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Menu, MenuButton, MenuItem, MenuList, Portal, useToast ,Button} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
const UserHeader = ({user}) => {
    //using toast from chakra
    const toast=useToast()
    //copying url function
    const currentUser= useRecoilValue(userAtom);
    const [following,setFollowing]=React.useState(user.followers.includes(currentUser?._id));
    console.log(following);
    const copyURL=()=>{
        const currentURL=window.location.href;
        navigator.clipboard.writeText(currentURL).then(()=>{
              toast({
                title: `URL Copied`,
                position: 'bottom',
                isClosable: true,
              })
        })
      }
      const [updating,setUpdating]=React.useState(false);
      const handleFollowNUnfollow=async()=>{
         if(!currentUser){
            toast({
               title: `Error`,
               description: 'Please login to follow',
               status: 'error',
               duration: 3000,
               isClosable: true,
            })
            return;
         }
         setUpdating(true);
         try{
            const response=await fetch(`/api/users/follow/${user._id}`,{
               method:'POST',
               headers:{
               'Content-Type':'application/json'
               },
               body:JSON.stringify({follow:following})
            })
            const data=await response.json();
            console.log(data);
         
            if(data.error){
               toast({
               title: `Error`,
               description: data.error,
               status: 'error',
               duration: 3000,
               isClosable: true,
               })
            }
            if(following)
            {
               toast({
               title: `Unfollowed`,
               description: `You have unfollowed ${user.name}`,
               status: 'success',
               duration: 3000,
               isClosable: true,
               })
               user.followers.pop(currentUser?._id);
            }
            else{
               toast({
               title: `Followed`,
               description: `You have followed ${user.name}`,
               status: 'success',
               duration: 3000,
               isClosable: true,
               })
               user.followers.push(currentUser?._id);
            }
            setFollowing(!following);
         }catch(error){
            toast({
               title: `Error`,
               description: error,
               status: 'error',
               duration: 3000,
               isClosable: true,
            })
         }finally{
            setUpdating(false);
         }
      }
      
      
    
  return (
   <>
   <VStack gap={4} alignItems={"start"}>
    <Flex justifyContent={"space-between"} w={"full"}>
    <Box>
        <Text fontSize={"2xl"} fontWeight={"bold"}>{user.name}</Text>
    
    <Flex gap={2} alignItems={"center"}>
        <Text fontSize ={"sm"}>{user.username}</Text>
        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={2} borderRadius={"full"} >
            threads.next
        </Text>
    </Flex>
    </Box>
    <Box>
       {user.profilePic&&(
         <Avatar
         name={user.name}
         src={user.profilePic}
         size={{base:'md',md:'lg' }}
         />
       )}
         {!user.profilePic&&(
         <Avatar
         name={user.name}
         src='https://bit.ly/broken-link'
         size={{base:'md',md:'lg' }}
         />
       )}
    </Box> 
    </Flex>
    <Text>{user.bio}</Text>
   { currentUser?._id===user._id&&(
      <Link as ={RouterLink} to='/update' >
      <Button size={'sm'}>
          Update Profile
      </Button>
      </Link>
   )}
   { currentUser?._id!==user._id&&(
      <Button size={'sm'} onClick={handleFollowNUnfollow} isLoading={updating}>
         {following?'Unfollow':'Follow'}
      </Button>
   )}
    <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2}alignItems={"center"}>
            <Text color={"gray.light"}>{user.followers.length} followers</Text>
            <Box w="1" h="1"  bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex>
         <Box className ='icon-container' p={2}>
            <RiInstagramFill size={24} cursor={"pointer"} />
         </Box>
         <Box p={2}>
            <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"}/>
                </MenuButton>
                    <Portal>
                        <MenuList bg="gray.dark">
                           <MenuItem  bg="gray.dark" onClick={copyURL}>Copy Link</MenuItem>
                        </MenuList>
                    </Portal>
                
            </Menu>
         </Box>
          </Flex>
    </Flex>
      <Flex w={'full'}>
         <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
            <Text>Threads</Text>
         </Flex>
         <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} pb="3" cursor={"pointer"}>
            <Text>Replies</Text>
         </Flex>
      </Flex>
    
   </VStack>
   </>
  )
}

export default UserHeader