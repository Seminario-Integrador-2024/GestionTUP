import React from 'react';
import TablaAlumnos from './SubPages/TablaAlumnos';
import { FetchFirmantes } from '../../../API/AlumnosCompromisoPago';

const AlumnosBaja = () => { 
    return (
        <TablaAlumnos fetchFunction={FetchFirmantes} title="Alumnos que se dieron de baja" />
    );
};

export default AlumnosBaja;
