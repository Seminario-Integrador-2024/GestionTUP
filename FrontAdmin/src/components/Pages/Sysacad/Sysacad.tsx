import { Grid, Text, Stack } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';
import TablaMaterias from '../Configuracion/Materias/TablaMaterias';

function Sysacad() {
  return (
    <Tabs>
      <TabList>
        <Tab>Sysacad</Tab>
        <Tab>Materias</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Aca se carga el excel proveniente de Sysacad</p>
        </TabPanel>
        <TabPanel>
          <Stack direction="column" spacing={4} align="center">
            <TablaMaterias />
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sysacad;
