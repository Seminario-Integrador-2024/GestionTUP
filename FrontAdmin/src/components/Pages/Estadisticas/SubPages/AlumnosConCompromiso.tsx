import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  List,
  ListItem,
  Spinner,
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
    return <Box color="red.500">{error}</Box>;
  }

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <List spacing={3}>
          {alumnos.map(alumno => (
            <ListItem key={alumno.legajo}>
              {alumno.full_name} (Legajo: {alumno.legajo}, DNI: {alumno.dni}, Situación: {alumno.estado_financiero}, Año Ingreso: {alumno.anio_ingreso})
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default AlumnosConCompromiso;
