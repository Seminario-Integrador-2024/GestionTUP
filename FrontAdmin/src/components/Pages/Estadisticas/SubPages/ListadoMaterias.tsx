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
import { FetchAlumnosMaterias } from '../../../../API/Materias';

interface Materia {
  anio_cursada: number;
  anio_plan: number;
  codigo_materia: number;
  cuatrimestre: number;
  nombre: string;
}

const ListadoMaterias: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [filteredMaterias, setFilteredMaterias] = useState<Materia[]>([]);
  const [alumnos, setAlumnos] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  const handleMateriaClick = async (codigoMateria: number) => {
    try {
      const alumnosData = await FetchAlumnosMaterias(codigoMateria);
      setAlumnos(alumnosData); 
      navigate(`${codigoMateria}/alumnos`); 
    } catch (error) {
      console.error('Error al obtener los alumnos:', error);
      setAlumnos([]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = materias.filter((materia) =>
      materia.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMaterias(filtered);
  };

  const indexOfLastMateria = currentPage * itemsPerPage;
  const indexOfFirstMateria = indexOfLastMateria - itemsPerPage;
  const currentMaterias = filteredMaterias.slice(indexOfFirstMateria, indexOfLastMateria);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaterias();
        if (data && Array.isArray(data.results)) {
          const sortedMaterias = data.results.sort((a: Materia, b: Materia) =>
            a.nombre.localeCompare(b.nombre)
          );
          setMaterias(sortedMaterias);
          setFilteredMaterias(sortedMaterias); 
        } else {
          console.error('Datos inválidos:', data);
          setMaterias([]); 
          setFilteredMaterias([]); 
        }
      } catch (error) {
        console.error('Network error:', error);
        setMaterias([]);
        setFilteredMaterias([]); 
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
                onClick={() => handleMateriaClick(materia.codigo_materia)} 
              >
                <Text fontSize="md" color="gray.700">
                  {materia.nombre}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>

        <HStack spacing={4} justify="center" mt={4}>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            color="white"
            bg="blue.700" 
            _hover={{ bg: 'blue.800' }}
          >
            {'Anterior <<'}
          </Button>
          <Text>
            Página {currentPage} de {Math.ceil(filteredMaterias.length / itemsPerPage)}
          </Text>
          <Button
            isDisabled={currentPage === Math.ceil(filteredMaterias.length / itemsPerPage)}
            onClick={() => paginate(currentPage + 1)}
            color="white"
            bg="blue.900"
            _hover={{ bg: 'blue.800' }}
          >
            {'Siguiente >>'}
          </Button>
        </HStack>

        <Outlet />
      </VStack>
    </Container>
  );
};

export default ListadoMaterias;
