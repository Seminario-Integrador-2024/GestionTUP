import  { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import { FetchLogin } from "../../../API/Login";



function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const titleColor = useColorModeValue("red.500", "red.500");
  const textColor = useColorModeValue("white", "black");




  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await FetchLogin(username, email, password);

    } catch (error) {
      console.error('Network error', error);
      // Handle network errors here
    }
  };

  return (
    <Flex position='relative' mb='40px' backgroundColor='dark'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <form onSubmit={handleSubmit}>
            <Flex
              direction='column'
              w='100%'
              background='transparent'
              p='48px'
              mt={{ md: "150px", lg: "80px" }}>
              <Heading color={titleColor} fontSize='50px' mb='50px'>
                Login TUP
              </Heading>
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal' color={textColor}>
                  Usuario
                </FormLabel>
                <Input
                  borderRadius='15px'
                  borderColor={textColor}
                  mb='24px'
                  fontSize='sm'
                  type='name'
                  placeholder='Escribe tu nombre de usuario'
                  _placeholder={{ color: textColor }}
                  color={textColor}
                  size='lg'
                  _focus={{ borderColor: "red" }}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal' color={textColor}>
                  Contraseña
                </FormLabel>
                <Input
                  borderRadius='15px'
                  borderColor={textColor}
                  mb='36px'
                  fontSize='sm'
                  type='password'
                  placeholder='Escribe tu contraseña'
                  _placeholder={{ color: textColor }}
                  size='lg'
                  _focus={{ borderColor: "red" }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Button
                  fontSize='16px'
                  type='submit'
                  bg='red.500'
                  w='100%'
                  h='45'
                  mb='20px'
                  color='black'
                  mt='20px'
                  _hover={{
                    bg: "red.200",
                  }}
                  _active={{
                    bg: "black",
                    color: 'white',
                  }}
                >
                  Acceder
                </Button>
              </FormControl>
            </Flex>
          </form>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={`url(https://th.bing.com/th/id/OIP.0LjfgJYuE3hxiDr_dw68GgHaE7?rs=1&pid=ImgDetMain)`}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginPage;