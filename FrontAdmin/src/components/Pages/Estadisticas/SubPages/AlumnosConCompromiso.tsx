import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  VStack,
  List,
  ListItem,
  Spinner,
  useTab,
} from '@chakra-ui/react';
import { FetchAlumnos } from '../../../../API/DatosAlumnosV2';

interface Alumnos {
  nombre: string;
  legajo: number;
  dni: number;
  situacion: string;
  anio_ingreso: number;
}

const AlumnosConCompromiso: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumnos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await FetchAlumnos();
        if (!response.ok) {
          throw new Error('Error al obtener los alumnos');
        }
        const data: Alumnos[] = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, );

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Tabs variant="enclosed" isLazy>
          <TabPanels>
            <Box>
              <List spacing={3}>
                {alumnos.map(alumno => (
                  <ListItem key={alumno.legajo}>
                    {alumno.nombre} (Legajo: {alumno.legajo}, DNI: {alumno.dni}, Situacion: {alumno.situacion}, Año Ingreso: {alumno.anio_ingreso})
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default AlumnosConCompromiso;
