import { useRoutes } from "react-router-dom";
import { Box, Drawer, DrawerContent, useDisclosure} from "@chakra-ui/react";
import {MobileNav} from "../components/NavBar/MobileNav";
import { SidebarContent } from "../components/NavBar/SidebarContent";
import routes from "../routes";

import Header from "../components/Header/Header";

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const element = useRoutes(routes);

  return (
    <Box minH="100vh">
      <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} onOverlayClick={onClose} size="xs">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Header/>
      <Box ml={{ base: 0, md: 20 }} p="4" pt="20" pl='20'>
        {element}
      </Box>
    </Box>
  );
}


