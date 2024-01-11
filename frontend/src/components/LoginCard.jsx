import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Link,
  Alert,
  AlertIcon,
  useColorMode,
  useColorModeValue,

} from '@chakra-ui/react';
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';
import { set } from 'mongoose';

const LoginCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser= useSetRecoilState(userAtom); 
  const showToast = useShowToast();
  const[loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
       console.log(res);
      // Check if the response status is OK (2xx)
      if (res.ok) {
        const data = await res.json();
    
        showToast("Login Successful", "You have been logged in", "success");
        localStorage.setItem("user-data", JSON.stringify(data));
        setUser(data);
      } else {
        const data = await res.json();
        showToast("Error", data.message || "Something went wrong", "error");
        console.log("Raw Response:", yourRawResponse);

      }
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
    }finally{
      setLoading(false);
    };
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
    } else {
      setError(null);
      handleLogin();
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box
      p={12}
      w={{ base: 'full', sm: '400px' }}
      mx="auto"
      my={{ base: '15px', sm: 'auto' }}
      bg={useColorModeValue("white.900", "gray.700")}
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={2} align="stretch" mx="auto" maxW="350px">
        <Heading as="h2" size="xl" textAlign="center">
          Login
        </Heading>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username or Email Id</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              border={"1px"}
              borderRadius={"8px"}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              border={"1px"}
              borderRadius={"8px"}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={loading} mt={5}>
            Login
          </Button>
          <Text mt={4}>
            Don't have an account?{' '}
            <Link
              textColor={useColorModeValue('gray.dark', 'white')}
              onClick={() => {
                setAuthScreen('signup');
              }}
              to={'/signup'}
            >
              Signup
            </Link>
          </Text>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginCard;
