import React from 'react';
import TablaAlumnos from './TablaAlumnos';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';

const Matricula: React.FC = () => {
  return (
    <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos que abonaron matricula" />
  );
};

export default Matricula;
