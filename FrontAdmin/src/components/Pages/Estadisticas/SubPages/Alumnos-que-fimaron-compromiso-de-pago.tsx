import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';
import { FetchNoFirmantes } from '../../../../API/AlumnosCompromisoPago';
import Pestaña from './Pestaña';

const AlumnosCompromisoPago: React.FC = () => {
  return (
    <div>
      <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos con compromiso"/>
    </div>
  );
};

export default AlumnosCompromisoPago;


