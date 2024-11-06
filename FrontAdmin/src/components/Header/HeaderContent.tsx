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
} from '@chakra-ui/react';
import imgLogo from '../icons/Logos TUP_Mesa de trabajo 1.png';
import logoUser from '../icons/logo-user.png';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../Context';
import Cookies from 'js-cookie';
import Perfil from '../Modal/Perfil';
import Contraseña from '../Modal/Contraseña';

export function HeaderContent({ onOpen }: { onOpen: any }) {
  const { onLogout } = useAuth();
  const user = Cookies.get('full_name');
  // Perfil
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  // Contraseña
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
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
        <Text fontFamily={"'Roboto',sans-serif"} fontWeight="600">{user}</Text>
        <MenuButton borderRadius={'full'}>
          <Avatar
            name={Cookies.get("full_name")}
            borderRadius="full"
          />
        </MenuButton>
        <MenuList>
          <MenuItem 
            onClick={onOpen1}>
            Ver Perfil
          </MenuItem>
          <MenuItem onClick={onOpen2}>Cambiar Contraseña</MenuItem>
          <MenuItem onClick={() => onLogout()}>Cerrar sesión</MenuItem>
        </MenuList>
        </Flex>
      </Menu>
      <Perfil 
      isOpen={isOpen1}
      onClose={onClose1}
      confirmar={handleConfirmar}
      />
      <Contraseña
      isOpen={isOpen2}
      onClose={onClose2}
      />
    </Flex>
  );
}
