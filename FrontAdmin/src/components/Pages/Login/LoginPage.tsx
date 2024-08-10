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
  Link, 
  Image
} from "@chakra-ui/react";
import { FetchLogin } from "../../../API/Login";
import { useAuth } from "../../../Context";
import fondoLogin from '../../icons/utn-portada-transformed.jpeg'
import imgLogin from '../../icons/Logos TUP_Mesa de trabajo 1.png' 



function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { onLogin } = useAuth();

  const titleColor = useColorModeValue("black", "white");
  const textColor = useColorModeValue("black", "white");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await FetchLogin(username, password);
      onLogin();

    } catch (error) {
      console.error('Network error', error);
      // Handle network errors here
    }
  };

  return (
    <Flex position='relative' backgroundColor='#EEEEF0' minHeight='100vh'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        //mx='auto'
        ml={{ sm:"initial", md: "8vh", lg: "8vh" }}
        mb='30px'
        p='8vh'
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
              //p='48px'
              mt={{ md: "150px", lg: "80px" }}
              >
              <Flex justifyContent='center'>
                <Image src={imgLogin}  w='120px' ></Image>
              </Flex>
              <Heading 
                color={titleColor} 
                fontSize={{base:'28px',  md: "30px", lg: "35px" }}
                m={{base:'10px',  md: "40px"}}
                fontWeight='500' outline='none'>
                Iniciar sesión
              </Heading>
              <FormControl> 
                <Input
                  borderRadius='none'
                  borderTop='none'
                  borderLeft='none'
                  borderRight='none'
                  borderColor='gray'
                  mb='24px'
                  fontSize='md'
                  type='name'
                  placeholder='Usuario'
                  _placeholder={{ color: '#3f3f3f' }}
                  color={textColor}
                  size='lg'
                  pl='4px'
                  _focus={{ 
                    borderColor: "#003063",
                    boxShadow:'none',
                    
                  }}
                  _hover={{ borderColor: "0f183f",}}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Input
                  borderRadius='0'
                  borderTop='none'
                  borderLeft='none'
                  borderRight='none'
                  outline='none'
                  display='block'
                  borderColor='gray'
                  mb='36px'
                  fontSize='md'
                  type='password'
                  placeholder='Contraseña'
                  _placeholder={{ color: '#3f3f3f' }}
                  size='lg'
                  pl='4px'
                  _focus={{ 
                    borderColor: "#003063",
                    boxShadow:'none'
                  }}
                  _hover={{ borderColor: "0f183f",}}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Button w='100%' h='42' mb='20px' mt='20px' type='submit'>
                  Acceder
                </Button>
                <Flex alignItems='center' justifyContent='center'> 
                  <Link 
                    color='textColor' 
                    href='#' 
                    fontSize='15px'
                    _hover={{ border:'none'}}
                    >
                   Olvide mi contraseña
                  </Link>
                </Flex>

              </FormControl>
            </Flex>
          </form>
        </Flex>
        <Box
          display={{ base: "none", md: "none", lg:"block" }}
          overflowX='hidden'
          h='100%'
          w='65vw'
          position='absolute'
          right='0px'
          >
          <Box
            bgImage={fondoLogin}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            filter='contrast(120%)'
            >
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginPage;