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
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'; // Importa los iconos
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
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alumnosPerPage] = useState<number>(10);

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

  // Calcular los índices para la paginación
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);
  const totalPages = Math.ceil(alumnos.length / alumnosPerPage);

  return (
    <Box p={5}>
      <Table>
        <Thead>
          <Tr>
            <Th fontFamily="Helvetica" fontWeight="900">APELLIDO Y NOMBRE</Th>
            <Th fontFamily="Helvetica" fontWeight="900">LEGAJO</Th>
            <Th fontFamily="Helvetica" fontWeight="900">DNI</Th>
            <Th fontFamily="Helvetica" fontWeight="900">SITUACION FINANCIERA</Th>
            <Th fontFamily="Helvetica" fontWeight="900">AÑO INGRESO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentAlumnos.map(alumno => (
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

      <HStack spacing={4} mt={4} justifyContent="flex-end">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          bg="transparent"
          _hover={{ bg: 'gray.200' }} // Fondo al pasar el mouse
          _active={{ bg: 'gray.300' }} // Fondo al hacer clic
          aria-label="Página anterior"
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          bg="transparent"
          _hover={{ bg: 'gray.200' }} // Fondo al pasar el mouse
          _active={{ bg: 'gray.300' }} // Fondo al hacer clic
          aria-label="Siguiente página"
        />
      </HStack>
    </Box>
  );
};

export default AlumnosConCompromiso;
