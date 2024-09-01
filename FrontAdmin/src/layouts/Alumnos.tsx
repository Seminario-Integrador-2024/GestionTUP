import { useRoutes } from 'react-router-dom';
import { Box, Drawer, DrawerContent, useDisclosure, Text } from '@chakra-ui/react';
import { MobileNav } from '../components/NavBar/MobileNav';
import { SidebarContent } from '../components/NavBar/SidebarContent';
import routes from '../routes';

import Header from '../components/Header/Header';

export default function Alumnos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const element = useRoutes(routes);

  return (
    <Box minH="100vh">
      <Text>Alumnos</Text>
    </Box>
  );
}
