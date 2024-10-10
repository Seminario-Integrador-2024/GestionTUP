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
  Input,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FetchFirmantes } from '../../../../API/AlumnosCompromisoPago';

interface Alumnos {
  full_name: string;
  legajo: number;
  dni: number;
  estado_financiero: string;
  anio_ingreso: number;
}

const Matricula: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumnos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alumnosPerPage] = useState<number>(10);
  
  const [sortField, setSortField] = useState<keyof Alumnos>('full_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Función para ordenar los alumnos
  const sortedAlumnos = [...alumnos].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtrar los alumnos según el término de búsqueda
  const filteredAlumnos = sortedAlumnos.filter(alumno =>
    alumno.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.legajo.toString().includes(searchTerm) ||
    alumno.dni.toString().includes(searchTerm) ||
    alumno.estado_financiero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.anio_ingreso.toString().includes(searchTerm)
  );

  // Calcular los índices para la paginación
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = filteredAlumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);
  const totalPages = Math.ceil(filteredAlumnos.length / alumnosPerPage);

  return (
    <Box p={5}>
      <Input
        placeholder="Buscar por Nombre, Legajo, DNI, Situación o Año de Ingreso"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <Table>
        <Thead>
          <Tr>
            <Th fontFamily="Helvetica" fontWeight="900">
              APELLIDO Y NOMBRE
              <IconButton
                icon={sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="xs"
                onClick={() => {
                  setSortField('full_name');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                aria-label="Ordenar por nombre"
                variant="link"
                bg="transparent"
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
              />
            </Th>
            <Th fontFamily="Helvetica" fontWeight="900">
              LEGAJO
              <IconButton
                icon={sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="xs"
                onClick={() => {
                  setSortField('legajo');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                aria-label="Ordenar por legajo"
                variant="link"
                bg="transparent"
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
              />
            </Th>
            <Th fontFamily="Helvetica" fontWeight="900">
              DNI
              <IconButton
                icon={sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="xs"
                onClick={() => {
                  setSortField('dni');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                aria-label="Ordenar por DNI"
                variant="link"
                bg="transparent"
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
              />
            </Th>
            <Th fontFamily="Helvetica" fontWeight="900">
              SITUACION
              <IconButton
                icon={sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="xs"
                onClick={() => {
                  setSortField('estado_financiero');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                aria-label="Ordenar por situación"
                variant="link"
                bg="transparent"
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
              />
            </Th>
            <Th fontFamily="Helvetica" fontWeight="900">
              AÑO DE INGRESO
              <IconButton
                icon={sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="xs"
                onClick={() => {
                  setSortField('anio_ingreso');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                aria-label="Ordenar por año de ingreso"
                variant="link"
                bg="transparent"
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
              />
            </Th>
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
          _hover={{ bg: 'gray.200' }}
          _active={{ bg: 'gray.300' }}
          aria-label="Página anterior"
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          bg="transparent"
          _hover={{ bg: 'gray.200' }}
          _active={{ bg: 'gray.300' }}
          aria-label="Siguiente página"
        />
      </HStack>
    </Box>
  );
};

export default Matricula;
