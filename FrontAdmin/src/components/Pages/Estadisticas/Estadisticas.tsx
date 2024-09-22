import {
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { Outlet, useRoutes } from 'react-router-dom';
import routes from '../../../routes';
import SubMenuContent from '../../SubMenu/SubMenuContent';

function Estadisticas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const element = useRoutes(routes);
  return (
    <Box display="flex">
      <SubMenuContent onClose={onOpen} titleSubMenu="INFORMES" />
      <Box flex="1" ml="300px">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Estadisticas;
