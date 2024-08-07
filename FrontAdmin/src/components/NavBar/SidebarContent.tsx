import { Box, Flex, HStack, CloseButton, useMediaQuery, Text, BoxProps } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { LINK_ITEMS } from "./LinksItems";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const location = useLocation();

  return (
    <>
      <Box
        bg="white"
        borderRight="1px"
        borderRightColor="gray.300"
        w={{ base: "full", md: '100px' }}
        pos="fixed"
        h="100% "
        {...rest}
      >
        <HStack h="5" marginLeft="8">
          {!isLargerThanMd && <CloseButton onClick={onClose} marginRight="8" />}
        </HStack>
        <Flex alignItems="center" justifyContent="center" flexDirection="column"  gap='2'>
          <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold"  color='black' >
            TUP
          </Text>
          {LINK_ITEMS.map((link) => (
            <Link key={link.url} to={link.url} onClick={onClose} >
              <NavItem icon={link.icon} color={location.pathname === link.url ? "green.100" : "white"}/>
            </Link>
          ))}
        </Flex>
      </Box>
    </>
  );
}
