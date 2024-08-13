import { useRoutes } from "react-router-dom";
import { Box, Drawer, DrawerContent, useDisclosure} from "@chakra-ui/react";
import {MobileNav} from "./MobileNav";
import { SidebarContent } from "./SidebarContent";
import routes from "../../routes";

export default function NavBar() {
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
      <Box ml={{ base: 0, md: 20 }} p="4" pt="20" pl='20'>
        {element}
      </Box>
    </Box>
  );
}


