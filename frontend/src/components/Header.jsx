import { Button, Flex,Image, Link, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import {AiFillHome} from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import {RxAvatar} from 'react-icons/rx'
import useLogout from '../hooks/useLogout';
import { FiLogOut } from "react-icons/fi";
import authScreenAtom from '../atoms/authAtom';

const Header = () => {
    const {colorMode,toggleColorMode}=useColorMode();
    const user=useRecoilValue(userAtom); 
    const logout=useLogout();
    const setAuthScreen=useSetRecoilState(authScreenAtom);
  return (
<>
    <Flex justifyContent={"space-between"} mt={6} mb='8'>
      {user &&  (
        <Link as ={RouterLink} to ='/'>
        <AiFillHome size={23}/>
        </Link>
      )}
        {!user &&  (
        <Link as ={RouterLink} to={"/auth"} onClick={
          ()=>setAuthScreen("login")
        }> 
                Login
        </Link>
      )}
         <Image cursor={"pointer"}
         alt="logo"
         w={6 }
         src={colorMode==="dark"?"light-logo.svg":"/dark-logo.svg"}
         onClick={toggleColorMode }/>
          {user &&  (
            <Flex align={"center"} gap={4}>
              <Link as ={RouterLink} to ={`/${user.username}`}>
        <RxAvatar size={24}/>
              </Link>
              <Button position={"flex-end"}   size={"sm"} onClick={logout}>
			        <FiLogOut size={20} />
		          </Button>
            </Flex>
        
      )}
        {!user &&  (
        <Link as ={RouterLink} to={"/auth"} onClick={
          ()=>setAuthScreen("signup")
        }> 
                Signup
        </Link>
      )}
    </Flex>
    </>
  )
}

export default Header;