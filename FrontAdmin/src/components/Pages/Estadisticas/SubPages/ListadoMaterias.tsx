import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  Heading,
  List,
  ListItem,
  VStack,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
import { FetchMaterias } from '../../../../API/Materias';
import { FetchAlumnosMaterias } from '../../../../API/Materias'; // Asumo que tienes esta función en tu API

interface Materia {
  anio_cursada: number;
  anio_plan: number;
  codigo_materia: number;
  cuatrimestre: number;
  nombre: string;
}

const ListadoMaterias: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]); // Estado para las materias
  const [filteredMaterias, setFilteredMaterias] = useState<Materia[]>([]); // Estado para las materias filtradas por búsqueda
  const [alumnos, setAlumnos] = useState([]); // Estado para los alumnos
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage] = useState(10); // Número de elementos por página
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda por nombre de materia
  const navigate = useNavigate();

  // Maneja el clic sobre una materia para obtener los alumnos
  const handleMateriaClick = async (codigoMateria: number) => {
    try {
      const alumnosData = await FetchAlumnosMaterias(codigoMateria); // Asumiendo que tienes una API para obtener los alumnos
      setAlumnos(alumnosData); // Guarda los datos de los alumnos
      navigate(`${codigoMateria}/alumnos`); // Navega a la ruta correspondiente
    } catch (error) {
      console.error('Error al obtener los alumnos:', error);
      setAlumnos([]); // Respaldo a un array vacío en caso de error
    }
  };

  // Filtra las materias por nombre, ignorando mayúsculas/minúsculas
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtra las materias según el query de búsqueda
    const filtered = materias.filter((materia) =>
      materia.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMaterias(filtered);
  };

  // Paginación
  const indexOfLastMateria = currentPage * itemsPerPage;
  const indexOfFirstMateria = indexOfLastMateria - itemsPerPage;
  const currentMaterias = filteredMaterias.slice(indexOfFirstMateria, indexOfLastMateria);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaterias();
        if (data && Array.isArray(data.results)) {
          const sortedMaterias = data.results.sort((a: Materia, b: Materia) =>
            a.nombre.localeCompare(b.nombre)
          ); // Ordenar alfabéticamente por el nombre
          setMaterias(sortedMaterias); // Establecer las materias ordenadas
          setFilteredMaterias(sortedMaterias); // Inicializamos también la lista filtrada
        } else {
          console.error('Datos inválidos:', data);
          setMaterias([]); // Respaldo a un array vacío si los datos son inválidos
          setFilteredMaterias([]); // Respaldo a un array vacío si los datos son inválidos
        }
      } catch (error) {
        console.error('Network error:', error);
        setMaterias([]); // Respaldo a un array vacío si ocurre un error
        setFilteredMaterias([]); // Respaldo a un array vacío si ocurre un error
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxW="container.md" p={4}>
      <VStack
        spacing={6}
        align="start"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        height="100vh"
        p={4}
        py={12}
      >
        <Heading as="h1" size="lg" fontSize="3xl" fontWeight="bold" mb={3}>
          Listado de Materias
        </Heading>

        {/* Campo de búsqueda */}
        <Box w="full">
          <Input
            placeholder="Buscar por nombre de materia"
            value={searchQuery}
            onChange={handleSearchChange}
            mb={4}
          />
        </Box>

        <Box w="full">
          <List spacing={3}>
            {currentMaterias.map((materia) => (
              <ListItem
                key={materia.codigo_materia}
                p={2}
                borderRadius="md"
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleMateriaClick(materia.codigo_materia)} // Llama a la función cuando se haga clic
              >
                <Text fontSize="md" color="gray.700">
                  {materia.nombre}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Paginación */}
        <HStack spacing={4} justify="center" mt={4}>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            color="white"
            bg="blue.700" // Color azul más oscuro
            _hover={{ bg: 'blue.800' }}
          >
            {'Anterior <<'} {/* Símbolo "Anterior" */}
          </Button>
          <Text>
            Página {currentPage} de {Math.ceil(filteredMaterias.length / itemsPerPage)}
          </Text>
          <Button
            isDisabled={currentPage === Math.ceil(filteredMaterias.length / itemsPerPage)}
            onClick={() => paginate(currentPage + 1)}
            color="white"
            bg="blue.900" // Color azul más oscuro
            _hover={{ bg: 'blue.800' }}
          >
            {'Siguiente >>'} {/* Símbolo "Siguiente" */}
          </Button>
        </HStack>

        <Outlet />
      </VStack>
    </Container>
  );
};

export default ListadoMaterias;
