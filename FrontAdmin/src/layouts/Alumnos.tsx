import { useRoutes } from 'react-router-dom';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { MobileNav } from '../components/NavBar/MobileNav';
import { SidebarContent } from '../components/NavBar/SidebarContent';
import routes from '../routes';

import Header from '../components/Header/Header';

export default function Alumnos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alumnosRoutes = routes.filter((route) => route.rol !== 'admin');
  const element = useRoutes(alumnosRoutes);
  const LINK_ITEMS_ = alumnosRoutes
    .filter((route) => route.title && route.icon && route.rol && route.path)
    .map((route) => ({
      title: route.title!,
      icon: route.icon!,
      url: route.path,
      rol: route.rol!,
    }));
  const LINK_ITEMS = LINK_ITEMS_.filter((link) => link.rol === 'alumnos');

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
        LINK_ITEMS={LINK_ITEMS}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} LINK_ITEMS={LINK_ITEMS} />
        </DrawerContent>
      </Drawer>
      <Box pos="relative" zIndex="10">
        <Header onOpen={onOpen} />
      </Box>
      <Box ml={{ base: 0, md: 20 }} p="10" pt="20">
        {element}
      </Box>
    </Box>
  );
}
