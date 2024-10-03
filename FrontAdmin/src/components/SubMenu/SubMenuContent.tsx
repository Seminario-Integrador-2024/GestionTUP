import React, { useState } from 'react';
import { Box, Tooltip, FlexProps, Heading } from '@chakra-ui/react';
import ItemSubMenu from './ItemSubMenu';
import { ITEMS_SUBMENU } from './LinksSubMenu';
import { Link, useLocation, Outlet, useRoutes } from 'react-router-dom';

interface subMenuProps extends FlexProps {
  titleSubMenu: string;
  onClose: () => void;
}

export default function SubMenuContent({
  titleSubMenu,
  onClose,
}: subMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <Box borderRight="1px" borderColor="gray.300" pos="fixed" h="100%">
      <Heading as="h4" size="md" textAlign="center" mb="15px" mt="20px">
        {titleSubMenu}
      </Heading>

      {ITEMS_SUBMENU.map((item, index) => (
        <Link key={index} to={item.url} onClick={onClose}>
          <Tooltip label={item.tooltip}
              placement="right"
              pt="8px"
              pb="8px"
              pl="20px"
              pr="20px"
              ml="8px"
              bg="secundaryHover"
              color="black"
              hasArrow
              borderRadius="10px">
            <span>
              <ItemSubMenu
              title={item.title}
              color={
                location.pathname.startsWith('/admin/estadisticas/' + item.url)
                ? 'secundary'
                : 'white'
              }
              />
            </span>
          </Tooltip>
        </Link>
      ))}
    </Box>
  );
}
