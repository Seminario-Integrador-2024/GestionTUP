import {
  Flex,
  Image,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Box,
  Text,
  useDisclosure,
  Avatar,
  useBreakpointValue
} from '@chakra-ui/react';
import imgLogo from '../icons/Logos TUP_Mesa de trabajo 1.png';
import logoUser from '../icons/logo-user.png';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../Context';
import Cookies from 'js-cookie';
import Perfil from '../Modal/Perfil';

export function HeaderContent({ onOpen }: { onOpen: any }) {
  const { onLogout } = useAuth();
  const user = Cookies.get('full_name') || '';

  function formatUserName(fullName: string): string {
    const parts = fullName.trim().split(',');
    if (parts.length === 2) {
      const lastName = parts[0].trim();
      const firstName = parts[1].trim();
      return `${firstName}, ${lastName}`;
    }
    return fullName.trim();
  }

  // Definir el ancho de la caja de SubMenuContent según el tamaño de la pantalla
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Perfil  
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const handleConfirmar = () => {

    // TODO: Implementar la lógica de confirmar
  }

  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.300"
      w="100%"
      pos="fixed"
      pl="30px"
      pr="30px"
      justifyContent="space-between"
      textAlign="center"
      h="80px"
      background="white"
      alignItems="center"
    >
      <Menu>
        <Image
          src={imgLogo}
          w="80px"
          display={{ base: 'none', md: 'flex' }}
        ></Image>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
          display={{ base: 'flex', md: 'none' }}
          color="white"
        />
        <Flex direction={"row"} alignItems={"center"} gap={3}>
        <Text display={isMobile ? 'none' : ''} fontFamily={"'Roboto',sans-serif"} fontWeight="600">{user}</Text>
        <MenuButton borderRadius={'full'}>
          <Avatar
            name={formatUserName(user || '')}
            borderRadius="full"
          />
        </MenuButton>
        <MenuList>
          <MenuItem 
            onClick={onOpen1}>
            Ver Perfil
          </MenuItem>
          <MenuItem onClick={() => onLogout()}>Cerrar sesión</MenuItem>
        </MenuList>
        </Flex>
      </Menu>
      <Perfil 
      isOpen={isOpen1}
      onClose={onClose1}
      confirmar={handleConfirmar}
      />
    </Flex>
  );
}
