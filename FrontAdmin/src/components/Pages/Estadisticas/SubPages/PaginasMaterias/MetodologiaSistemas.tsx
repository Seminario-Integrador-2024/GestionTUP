import React from 'react';
import Tabla from './Tabla';

const MetodologiaSistemas = () => {
  const headers = ['Nombre', 'Legajo', 'DNI', 'Situación', 'Año Ingreso'];

  const data = [
    {
      Nombre: 'Juan Pérez',
      Legajo: '12345',
      DNI: '12345678',
      Situación: { status: 'Habilitado' },
      'Año Ingreso': '2022',
    },
    {
      Nombre: 'María García',
      Legajo: '67890',
      DNI: '87654321',
      Situación: { status: 'Inhabilitado' },
      'Año Ingreso': '2021',
    },
    // Agrega más datos según sea necesario
  ];

  return <Tabla headers={headers} data={data} />;
};

export default MetodologiaSistemas;
