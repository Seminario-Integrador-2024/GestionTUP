import { Box, CardFooter, Flex, FormControl, FormLabel, Heading, HStack, Input, Spacer, Stack, StackDivider, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Card, CardBody, Text } from '@chakra-ui/react'
import Mensual from "./SubPages/Mensual";
import Cuatrimestral from "./SubPages/Cuatrimestral";
import Calendario from "./SubPages/Calendario";
import { Outlet } from "react-router-dom";

function Estadisticas() {

  
  console.log('Estadisticas');
  return (

    <Flex>
       <Tabs position='relative' variant='unstyled' w='100%'>
        <TabList mb='1em' >
          <Tab fontWeight='bold'>Mensual</Tab>
          <Tab fontWeight='bold'>Cuatrimestral</Tab>
          <Tab fontWeight='bold'>Calendario</Tab>
        </TabList>
        <TabIndicator mt='-10.5px' height='2px' bg='green.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Mensual />
          </TabPanel>
          <TabPanel>
            <Cuatrimestral />
          </TabPanel>
          <TabPanel>
            <Calendario />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>

  );
}

export default Estadisticas;