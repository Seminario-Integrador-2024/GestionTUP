import { Grid, Text, Stack } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import Sysadmin from '../SysAdmin/SysAdmin';
import CargaExcel from '../Sysacad/ExcelSysacad/CargaExcel';

function Excels() {
  return (
    <Tabs>
      <TabList>
        <Tab>SysAcad</Tab>
        <Tab>SysAdmin</Tab>
      </TabList>

  <TabPanels>
    <TabPanel>
      <Stack direction="column" spacing={4} align="center">
          <CargaExcel/>
      </Stack>
    </TabPanel>
    <TabPanel>
      <Stack direction="column" spacing={4} align="center">
          <Sysadmin/>
      </Stack>
    </TabPanel>
  </TabPanels>
</Tabs>
  );
}

export default Excels;
