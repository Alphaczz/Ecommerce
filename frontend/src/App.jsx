import React from "react";
import Header from "./components/Header";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import {Navigate, Route,Routes} from "react-router-dom";
import { Container, Flex,Button } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import CreatePost from "./components/CreatePost";
import UpdateProfilePage from "./pages/UpdateProfilePage";

const App = () => {
  const user =useRecoilValue(userAtom);
  return (
    <>
      <Container maxW={'620px'}  >
      <Header />
        <Routes>
          <Route path="/" element={user? <HomePage /> : <Navigate to ="/auth"/>} />
  
          <Route path="/auth" element={!user?<AuthPage />:<Navigate to ="/"/>} />
          <Route path="/:username" element={user? (
            <>
             <UserPage />
             <CreatePost />
            </>
         
          ):(
            <UserPage />
          )
        } />
          <Route path="update" element={user? <UpdateProfilePage/>:<Navigate to ="/auth"/>} />
          <Route path="/:username/post/:pid" element={<PostPage/>}/>
        </Routes>    
         <Flex justifyContent={"flex-end"} mb={4}>
         

        </Flex>   
       
      </Container>
     

    </>
  );
};

export default App;
    