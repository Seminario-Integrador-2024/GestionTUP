import React, { useState } from 'react';
import TablaAlumnos from './TablaAlumnos';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';

const AlumnosCompromisoPago: React.FC = () => {
  return (
    <div>
      <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos con compromiso"/>
    </div>
  );
};

export default AlumnosCompromisoPago;


