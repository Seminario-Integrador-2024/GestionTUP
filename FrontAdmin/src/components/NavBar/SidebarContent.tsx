import React from 'react';
import {
  Box,
  Flex,
  HStack,
  CloseButton,
  useMediaQuery,
  BoxProps,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import NavItem from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  LINK_ITEMS: {
    title: string;
    icon: string | JSX.Element;
    url: string;
    rol: string;
  }[];
}

export function SidebarContent({ onClose, LINK_ITEMS, ...rest }: SidebarProps) {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const location = useLocation();

  return (
    <Box
      borderRight="1px"
      borderColor="gray.300"
      w={{ base: 'full', md: '100px' }}
      pos="fixed"
      h="100%"
      {...rest}
    >
      <HStack h="5" marginLeft="8">
        {!isLargerThanMd && <CloseButton onClick={onClose} marginRight="8" />}
      </HStack>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="2"
        mt="70px"
      >
        {LINK_ITEMS.map((link, key) => (
            <Link key={key} to={link.url} onClick={onClose}>
            <span>
            <NavItem
              icon={link.icon}
              title={link.title}
              color={
              location.pathname.startsWith('/admin/' + link.url)
                ? 'secundary'
                :  
              location.pathname.startsWith('/alumnos/' + link.url)
                ? 'secundary'
                : 'white'
              }
            />
            </span>
            </Link>
        ))}
      </Flex>
    </Box>
  );
}
