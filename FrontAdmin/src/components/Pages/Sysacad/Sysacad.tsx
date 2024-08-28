import { Grid, Text, Stack } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import TablaMaterias from './Materias/TablaMaterias';
import CargaExcel from './ExcelSysacad/CargaExcel';

function Sysacad() {
  return (
    <Tabs>
  <TabList>
    <Tab>Sysacad</Tab>
    <Tab>Materias</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <Stack direction="column" spacing={4} align="center">
          <CargaExcel/>
      </Stack>
    </TabPanel>
    <TabPanel>
      <Stack direction="column" spacing={4} align="center">
          <TablaMaterias/>
      </Stack>
    </TabPanel>
  </TabPanels>
</Tabs>
  );
}

export default Sysacad;
