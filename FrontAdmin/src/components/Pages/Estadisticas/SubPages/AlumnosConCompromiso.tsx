import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
} from '@chakra-ui/react';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';

interface Alumnos {
  full_name: string;
  legajo: number;
  dni: number;
  estado_financiero: string;
  anio_ingreso: number;
}

const AlumnosConCompromiso: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumnos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirmantes = async () => {
      try {
        const data: Alumnos[] = await FetchFirmantes();
        setAlumnos(data);
      } catch (error) {
        setError('Error al obtener los alumnos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirmantes();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Alert status="error">{error}</Alert>;
  }

  return (
    <Box p={5}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Nombre Completo</Th>
            <Th>Legajo</Th>
            <Th>DNI</Th>
            <Th>Situación Financiera</Th>
            <Th>Año de Ingreso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alumnos.map(alumno => (
            <Tr key={alumno.legajo}>
              <Td>{alumno.full_name}</Td>
              <Td>{alumno.legajo}</Td>
              <Td>{alumno.dni}</Td>
              <Td>{alumno.estado_financiero}</Td>
              <Td>{alumno.anio_ingreso}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AlumnosConCompromiso;
