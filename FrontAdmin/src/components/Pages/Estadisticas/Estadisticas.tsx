import React, { useState, useEffect } from 'react';
import { Box, IconButton, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Outlet } from 'react-router-dom';
import SubMenuContent from '../../SubMenu/SubMenuContent';

function Estadisticas() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, xl: false });

  const [showHamburger, setShowHamburger] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowHamburger(false);
    } else {
      setShowHamburger(true);
    }
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box display="flex" position="relative">
      {!isMobile ? (
        <Box width="300px" display="flex" flexDirection="column">
          <SubMenuContent onClose={onClose} titleSubMenu="INFORMES" />
        </Box>
      ) : (
        showHamburger && !isOpen && ( 
          <Box
            position="fixed"
            bottom="760px"  
            left="10px"    
            zIndex="1000"
          >
            <IconButton
              aria-label="Abrir menú"
              icon={<HamburgerIcon color="white" />}
              onClick={onOpen}
              bg="blue.300"
            />
          </Box>
        )
      )}
      <Box
        flex="1"
        ml={isOpen && isMobile ? '250px' : '0'} 
        transition="all 0.3s"
        p="4"
      >
        <Outlet />
      </Box>

      {isOpen && isMobile && (
        <Box
          position="fixed" 
          top="0"
          left="0"
          width="250px"
          height="100vh"
          p="4"
          zIndex="999"
          bg="white" 
          boxShadow="xl" 
        >
          <SubMenuContent onClose={onClose} titleSubMenu="INFORMES" />

          <Box position="absolute" top="10px" right="10px">
            <IconButton
              aria-label="Cerrar menú"
              icon={<CloseIcon />}
              onClick={onClose}
              size="sm" 
              color="black" 
              variant="white" 
              bg="white"
              _hover={{ bg: 'gray.500' }} 
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Estadisticas;
