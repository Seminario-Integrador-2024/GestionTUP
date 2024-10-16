import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';
import { FetchNoFirmantes } from '../../../../API/AlumnosCompromisoPago';
import Pestaña from './Pestaña';

const AlumnosCompromisoPago: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada

  return (
    <div>
      <Tabs variant="enclosed" index={index} onChange={setIndex} isLazy>
        <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
          <Pestaña title="Firmaron" />
          <Pestaña title="No Firmaron" />
        </TabList>

        <TabPanels>
          <TabPanel>
            <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos con compromiso"/>
          </TabPanel>
          <TabPanel>
            <TablaAlumnos fetchFunction={FetchNoFirmantes} title="Alumnos sin compromiso"/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AlumnosCompromisoPago;


