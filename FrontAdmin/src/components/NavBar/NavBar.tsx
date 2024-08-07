import { Outlet } from "react-router-dom";
import { Box, Drawer, DrawerContent, useDisclosure, Text } from "@chakra-ui/react";
import {MobileNav} from "./MobileNav";
import { SidebarContent } from "./SidebarContent";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      
      <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} onOverlayClick={onClose} size="xs">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 20 }} p="4" pt="20">
        <Outlet />
      </Box>
    </Box>
  );
}


