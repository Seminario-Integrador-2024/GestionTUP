import React, { useState, useEffect } from 'react';
import { Box, IconButton, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Outlet } from 'react-router-dom';
import SubMenuContent from '../../SubMenu/SubMenuContent';

function Estadisticas() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Definir el ancho de la caja de SubMenuContent según el tamaño de la pantalla
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Estado para controlar la visibilidad del botón de hamburguesa
  const [showHamburger, setShowHamburger] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Función que maneja el desplazamiento
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Si el desplazamiento es hacia abajo, ocultamos el botón
      setShowHamburger(false);
    } else {
      // Si el desplazamiento es hacia arriba, mostramos el botón
      setShowHamburger(true);
    }
    setLastScrollY(window.scrollY); // Actualizamos la posición del scroll
  };

  // Usamos useEffect para agregar el evento de scroll al montar el componente
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box display="flex" position="relative">
      {/* SubMenuContent se muestra solo cuando no es pantalla pequeña */}
      {!isMobile ? (
        <Box width="300px" display="flex" flexDirection="column">
          <SubMenuContent onClose={onClose} titleSubMenu="INFORMES" />
        </Box>
      ) : (
        // En pantallas pequeñas, solo mostramos el botón de hamburguesa si showHamburger es true
        showHamburger && (
          <Box
            position="absolute"
            top="0"
            left="-25px" // Desplazar el botón 10px hacia la izquierda
            p="4"
            zIndex="1000"
          >
            <IconButton
              aria-label="Abrir menú"
              icon={<HamburgerIcon color="white" />}
              onClick={onOpen}
            />
          </Box>
        )
      )}

      {/* El contenido principal (Outlet) */}
      <Box
        flex="1"
        ml={isOpen && isMobile ? '250px' : '0'} // Si está abierto y es móvil, mueve el contenido a la derecha
        transition="all 0.3s"
        p="4"
      >
        <Outlet />
      </Box>

      {/* Barra lateral (SubMenu) visible en móvil si se abre */}
      {isOpen && isMobile && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="250px"
          height="100vh"
          p="4"
          zIndex="999"
        >
          <SubMenuContent onClose={onClose} titleSubMenu="INFORMES" />

          {/* Botón de cierre dentro del SubMenuContent */}
          <Box position="absolute" top="10px" right="10px">
            <IconButton
              aria-label="Cerrar menú"
              icon={<CloseIcon />}
              onClick={onClose}
              size="sm" // Tamaño pequeño
              color="black" // Color negro
              variant="white" // Sin fondo
              bg="white"
              _hover={{ bg: 'gray.500' }} // Cambia a gris cuando el cursor esté sobre el botón
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Estadisticas;
