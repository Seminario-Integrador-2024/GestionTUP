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
  Button,
  HStack,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';  

interface Alumnos {
  full_name: string;
  legajo: number;
  dni: number;
  estado_financiero: string;
  anio_ingreso: number;
}

interface TablaAlumnosProps {
  fetchFunction: () => Promise<Alumnos[]>;  
  title: string;
}

const TablaAlumnos: React.FC<TablaAlumnosProps> = ({ fetchFunction, title }) => {
  const [alumnos, setAlumnos] = useState<Alumnos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alumnosPerPage] = useState<number>(10);

  const [sortField, setSortField] = useState<keyof Alumnos>('full_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Alumnos[] = await fetchFunction();
        setAlumnos(data);
      } catch (error) {
        setError('Error al obtener los alumnos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Alert status="error">{error}</Alert>;
  }

  // Ordenar alumnos
  const sortedAlumnos = [...alumnos].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAlumnos = sortedAlumnos.filter(alumno =>
    alumno.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.legajo.toString().includes(searchTerm) ||
    alumno.dni.toString().includes(searchTerm) ||
    alumno.estado_financiero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.anio_ingreso.toString().includes(searchTerm)
  );

  const totalPages = filteredAlumnos.length > 0 ? Math.ceil(filteredAlumnos.length / alumnosPerPage) : 0;

  // Paginación
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = filteredAlumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  return (
    <Box p={5}>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar por Nombre, Legajo, DNI o Año de Ingreso"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      
      <Table>
        <Thead>
          <Tr>
            {['APELLIDO Y NOMBRE', 'LEGAJO', 'DNI', 'AÑO INGRESO'].map((field) => (
              <Th key={field} fontFamily="Helvetica" fontWeight="900" textAlign="center">
                {field.toUpperCase()}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {currentAlumnos.length === 0 ? (
            <Tr>
              <Td colSpan={5} textAlign="center">No se encontraron alumnos</Td>
            </Tr>
          ) : (
            currentAlumnos.map(alumno => (
              <Tr
                key={alumno.dni} 
                _hover={{
                  bg: 'gray.200', 
                  cursor: 'pointer',
                }}
              >
                <Td textAlign="center">
                  <Link to={`/admin/alumnos/${alumno.dni}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    {alumno.full_name}
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Link to={`/admin/alumnos/${alumno.dni}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    {alumno.legajo}
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Link to={`/admin/alumnos/${alumno.dni}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    {alumno.dni}
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Link to={`/admin/alumnos/${alumno.dni}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    {alumno.anio_ingreso}
                  </Link>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {filteredAlumnos.length > 0 && (
        <HStack spacing={4} mt={4} justifyContent="center">
          <Button
            colorScheme="blue"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            {'<<'} Anterior
          </Button>

          <Text>
            Página {currentPage} de {totalPages}
          </Text>

          <Button
            colorScheme="blue"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Siguiente {'>>'}
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default TablaAlumnos;
