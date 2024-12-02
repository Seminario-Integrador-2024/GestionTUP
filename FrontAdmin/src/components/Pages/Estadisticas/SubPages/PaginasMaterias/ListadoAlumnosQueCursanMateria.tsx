import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Asegúrate de importar Link
import { FetchAlumnosMaterias } from '../../../../../API/Materias';
import { Input, Button, Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const ListadoAlumnosQueCursanMateria = () => {
  type Alumno = {
    dni: number;
    email: string;
    full_name: string;
    legajo: number;
    estado_financiero: string;
    anio_ingreso: number;
    telefono: string;
    tel_res: string;
    celular: string;
    gender: string;
  };

  const headers = ['Nombre', 'Legajo', 'DNI', 'Estado Financiero', 'Año Ingreso'];
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAlumnos, setFilteredAlumnos] = useState<Alumno[]>([]); // Alumnos filtrados
  const { codigo_materia } = useParams<{ codigo_materia: string }>();

  const alumnosPerPage = 10; // Máximo de alumnos por página

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (codigo_materia) {
          const codigo_materiaNumber = parseInt(codigo_materia);
          const data = await FetchAlumnosMaterias(codigo_materiaNumber);
          setAlumnos(data.results);
          setFilteredAlumnos(data.results); // Inicialmente se muestran todos
        }
      } catch (error: any) {
        setError(error.message || 'Error al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [codigo_materia]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredAlumnos(alumnos); // Si no hay filtro, se muestran todos
      setCurrentPage(1); // Reseteamos la página a 1
    } else {
      const filtered = alumnos.filter((alumno) => {
        return (
          alumno.full_name.toLowerCase().includes(query) ||
          alumno.dni.toString().includes(query) ||
          alumno.legajo.toString().includes(query) ||
          alumno.estado_financiero.toLowerCase().includes(query) ||
          alumno.anio_ingreso.toString().includes(query)
        );
      });
      setFilteredAlumnos(filtered);
      setCurrentPage(1); // Reseteamos la página a 1 cuando cambiamos el filtro
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculamos los alumnos a mostrar según la página actual y los resultados filtrados
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = filteredAlumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  if (loading) return <Text>Cargando datos...</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  // Número total de páginas basado en los resultados filtrados
  const totalPages = filteredAlumnos.length > 0 ? Math.ceil(filteredAlumnos.length / alumnosPerPage) : 0;

  return (
    <Box p={5}>
      {/* Input con lupa */}
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar por Nombre, DNI, Legajo, Situación o Año de Ingreso"
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>
      
      <Table variant="simple" mb={4}>
        <Thead>
          <Tr>
            <Th fontFamily="Helvetica" fontWeight="900" textAlign="center">Apellido y Nombre</Th>
            <Th fontFamily="Helvetica" fontWeight="900" textAlign="center">Legajo</Th>
            <Th fontFamily="Helvetica" fontWeight="900" textAlign="center">DNI</Th>
            <Th fontFamily="Helvetica" fontWeight="900" textAlign="center">Estado Financiero</Th>
            <Th fontFamily="Helvetica" fontWeight="900" textAlign="center">Año Ingreso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentAlumnos.length === 0 ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                <Text>No se encontraron alumnos</Text>
              </Td>
            </Tr>
          ) : (
            currentAlumnos.map((alumno) => (
              <Tr
                key={alumno.dni}
                _hover={{
                  bg: 'gray.200', // Color de fondo cuando el cursor está sobre la fila
                  cursor: 'pointer', // Cambiar el cursor para indicar que es un enlace
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
                    {alumno.estado_financiero}
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

      {/* Paginación */}
      {totalPages > 0 && (
        <Flex justify="center" align="center" gap={4}>
          <Button 
            onClick={() => paginate(currentPage - 1)} 
            isDisabled={currentPage === 1} 
            colorScheme="blue"
            aria-label="Anterior"
          >
            {'<<'} Anterior
          </Button>

          <Text>
            Página {currentPage} de {totalPages}
          </Text>

          <Button 
            onClick={() => paginate(currentPage + 1)} 
            isDisabled={currentPage === totalPages} 
            colorScheme="blue"
            aria-label="Siguiente"
          >
            Siguiente {'>>'}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ListadoAlumnosQueCursanMateria;
