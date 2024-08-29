import { useParams } from 'react-router-dom';
import { Flex, Box, Image, Heading,Text,Spacer, useColorModeValue, } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import logoUser from '../../../icons/logo-user.png';

function FichaAlumno() {
  const { dni } = useParams();
  return (
    <Flex mt="20px"> 
      <Box 
        borderRight="1px solid #cbd5e0"
        w="20%"
        minH="80vh"
        p="20px"
      >
        <Flex justifyContent="center" m="20px">
          <Image src={logoUser} w="120px"/>
        </Flex>
        <Text color='gray'>Apellido y nombre</Text>
        <Text size="sm" alingText="center" pl="8px" fontWeight="Bold">Facundo Gabriel Melgarejo Roma</Text>
        <Text color='gray' mt="10px">Num. DNI:</Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">{dni}</Text>
        
        <hr></hr>
        
        <Text color='gray' mt="20px">Compromiso de Pago: </Text>
        <Text size="sm" alingText="center" pl="8px" fontWeight="Bold">Firmado</Text>
        <Text color='gray' mt="10px">Situación</Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">Habilitado</Text>
        <Text color='gray' mt="10px">Deuda:</Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">-</Text>


      </Box>
    </Flex>
  );
}

export default FichaAlumno;
