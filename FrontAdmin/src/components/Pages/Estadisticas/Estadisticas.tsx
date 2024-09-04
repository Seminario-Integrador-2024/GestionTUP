import {
  Box,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Stack,
  StackDivider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { Card, CardBody, Text } from '@chakra-ui/react';
import Mensual from './SubPages/Mensual';
import Cuatrimestral from './SubPages/Cuatrimestral';
import Calendario from './SubPages/Calendario';
import { Link, useLocation, Outlet, useRoutes } from 'react-router-dom';
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