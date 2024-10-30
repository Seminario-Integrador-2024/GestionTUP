import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchAbonaronMatricula } from '../../../../API/AlumnosAbonaronMatricula';
import { FetchNoFirmantes } from '../../../../API/AlumnosCompromisoPago';
import Pestaña from './Pestaña';

const Matricula: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada

  return (
    <div>
      <Tabs variant="enclosed" index={index} onChange={setIndex} isLazy>
        <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
          <Pestaña title="Abonaron" />
          <Pestaña title="No Abonaron" />
        </TabList>

        <TabPanels>
          <TabPanel>
            <TablaAlumnos fetchFunction={FetchAbonaronMatricula} title="Alumnos que abonaron matrícula"/>
          </TabPanel>
          <TabPanel>
            <TablaAlumnos fetchFunction={FetchNoFirmantes} title="Alumnos que no abonaron matrícula"/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Matricula;