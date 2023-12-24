import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";
const UserPage = () => {
   const {user,loading}= useGetUserProfile();
   const { username } = useParams();
   const showToast = useShowToast();
   const [posts,setPosts] = useRecoilState(postAtom);
   const [fetchingPosts,setFetchingPosts] = useState(false);
  useEffect(() => {
    
    const getPosts=async()=>{
      setFetchingPosts(true);
      try {
         const res =await fetch(`/api/posts/user/${username}`);
          const data = await res.json();
          console.log(data);
          setPosts(data);
          if(!res.ok){
            showToast("Error", data.error,"error");
          }
      } catch (error) {
        showToast("Error", error.message,"error");
        setPosts([]);
      }finally{
        setFetchingPosts(false);
      }
    }
   
    getPosts();
  }, [username, showToast,setPosts]);
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size='xl'/>
      </Flex>
    );
  }
  
  if (!user && !loading) {
    return (
      <h1>User not found</h1>
    );
  }
  
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has no post</h1>}
      {fetchingPosts && <Flex justifyContent={"center"}><Spinner size='xl'/></Flex>}
      {posts.map((p) => (
        <Post key={p._id} post={p} postedBy={p.postedBy}  />
      ))}
    </>
  );
};

export default UserPage;
