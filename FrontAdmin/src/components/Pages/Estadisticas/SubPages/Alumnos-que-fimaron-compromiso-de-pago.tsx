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
      <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos con compromiso"/>
    </div>
  );
};

export default AlumnosCompromisoPago;


