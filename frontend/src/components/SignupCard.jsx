import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
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
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

const SignupCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      localStorage.setItem('user-data', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast('Error', error.message || 'Something went wrong', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
    } else {
      setError(null);
      handleSignup();
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box
      p={12}
      w={{ base: 'full', sm: '400px' }}
      mx="auto"
      my={{ base: '15px', sm: 'auto' }}
      bg={useColorModeValue('white.900', 'gray.700')}
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={2} align="stretch" mx="auto" maxW="400px">
        <Heading as="h2" size="xl" textAlign="center">
          Sign Up
        </Heading>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl>
            <HStack spacing={4}>
              <Box flex="1">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  border={'1px'}
                  borderRadius={'8px'}
                />
              </Box>
              <Box flex="1">
                <FormLabel>Full name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  border={'1px'}
                  borderRadius={'8px'}
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              border={'1px'}
              borderRadius={'8px'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              border={'1px'}
              borderRadius={'8px'}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={5}>
            Sign Up
          </Button>
          <Text mt={4}>
            Already have an account?{' '}
            <Link
              textColor={useColorModeValue('gray.dark', 'white')}
              onClick={() => {
                setAuthScreen('login');
              }}
              to={'/login'}
            >
              Login
            </Link>
          </Text>
        </form>
      </VStack>
    </Box>
  );
};

export default SignupCard;
