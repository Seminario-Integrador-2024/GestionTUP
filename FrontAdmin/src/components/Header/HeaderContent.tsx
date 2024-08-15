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
} from '@chakra-ui/react';
import imgLogo from '../icons/Logos TUP_Mesa de trabajo 1.png';
import logoUser from '../icons/logo-user.png';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../Context';

export function HeaderContent({ onOpen }: { onOpen: any }) {
  const { onLogout } = useAuth();
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
        <MenuButton as={Button} borderRadius="50%" w="50px" h="50px" p="0px">
          <Image src={logoUser} w="100%"></Image>
        </MenuButton>
        <MenuList>
          <MenuItem color="gray" pointerEvents="none">
            Ver Perfil
          </MenuItem>
          <MenuItem onClick={() => onLogout()}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
