import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Spinner,
  Divider,
  Text,
} from '@chakra-ui/react';
import { FetchLogin } from '../../../API/Login';
import { useAuth } from '../../../Context';
import { useToast } from '../../Toast/useToast';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();
  const showToast = useToast();


  useEffect(() => {
    // Load Google Sign-In API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await FetchLogin(username, password);
      onLogin();
      showToast('Bienvenido', 'Inicio de sesión éxitoso', 'success');
    } catch (error) {
      console.error('Network error', error);
      showToast('Error', 'Inicio de sesión fallido', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex position="relative" backgroundColor="#efefef" minHeight="100vh">
      {/* ... (rest of the component remains the same) ... */}

      <Flex
        direction="column"
        w="100%"
        background="transparent"
        mt={{ md: '150px', lg: '80px' }}
      >
        <Button
          fontSize="15px"
          type="submit"
          bg="#022855"
          w="100%"
          h="42"
          mb="20px"
          color="white"
          mt="20px"
          fontWeight="500"
          letterSpacing="1px"
        >
          {isLoading ? <Spinner size="sm" /> : 'Acceder'}
        </Button>

        <Flex align="center" mb="20px">
          <Divider />
          <Text px="2">O</Text>
          <Divider />
        </Flex>

        <Box
          id="g_id_onload"
          data-client_id="357174677577-tjdmodvoomhh16hgnt98hgug223nts3e.apps.googleusercontent.com"
          data-context="signup"
          data-ux_mode="redirect"
          data-login_uri="http://127.0.0.1:8000/api/google-login/"
          data-itp_support="true"
        ></Box>
      </Flex>

      <Box
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></Box>
    </Flex>
  );
}

export default LoginPage;
