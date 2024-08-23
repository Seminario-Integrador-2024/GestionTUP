import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  CloseButton,
  useMediaQuery,
  Text,
  BoxProps,
  Collapse,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { LINK_ITEMS } from './LinksItems';
import NavItem from './NavItem';
import iconAlumno from '../icons/alumno 1.png';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsOpen(!isOpen);

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
        {LINK_ITEMS.map((link, key) => {
          if (link.accordion) {
            return (
              <React.Fragment key={key}>
                <Box onClick={handleToggle}>
                  <NavItem
                    icon={link.icon}
                    title={link.title}
                    color={
                      location.pathname.includes(link.url)
                        ? 'secundary'
                        : 'white'
                    }
                  />
                </Box>
                <Collapse in={isOpen}>
                  <Box pl={4}>
                    {link.accordion.map((linkAccordion, key) => (
                      <Link key={key} to={linkAccordion.url} onClick={onClose}>
                        <NavItem
                          title={linkAccordion.title}
                          color={
                            location.pathname === '/admin/' + linkAccordion.url
                              ? 'secundary'
                              : 'white'
                          }
                        />
                      </Link>
                    ))}
                  </Box>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              <Link key={key} to={link.url} onClick={onClose}>
                <NavItem
                  icon={link.icon}
                  title={link.title}
                  color={
                    location.pathname === '/admin/' + link.url
                      ? 'secundary'
                      : 'white'
                  }
                />
              </Link>
            );
          }
        })}
      </Flex>
    </Box>
  );
}
