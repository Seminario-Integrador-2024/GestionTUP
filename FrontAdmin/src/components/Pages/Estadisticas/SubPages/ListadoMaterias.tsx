import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  Heading,
  List,
  ListItem,
  VStack,
  Button,
} from '@chakra-ui/react';
import CustomSelect from './Seleccion';
import { LINK_MATERIAS } from '../../../Subjects/LinksMaterias';
import { FetchMaterias } from '../../../../API/Materias';

const opcionesCuatrimestre = [
  { value: '1', label: 'Primer Cuatrimestre' },
  { value: '2', label: 'Segundo Cuatrimestre' },
];

interface Materia {
  nombre: string;
  cuatrimestre: number; // Cambiado a number
}

const ListadoMaterias: React.FC = () => {
  const [cuatrimestre, setCuatrimestre] = useState<number>(1); // Cambiado a number
  const [asignaturas, setAsignaturas] = useState<Materia[]>([]);
  const [filteredAsignaturas, setFilteredAsignaturas] = useState<Materia[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getMaterias = async () => {
      try {
        const data = await FetchMaterias();
        setAsignaturas(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getMaterias();
  }, []);

  useEffect(() => {
    const filteredData = asignaturas.filter(
      (asignatura) => asignatura.cuatrimestre === cuatrimestre
    );
    setFilteredAsignaturas(filteredData);
  }, [cuatrimestre, asignaturas]);

  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCuatrimestre(parseInt(event.target.value, 10)); // Convertimos el valor a número
  };

  const handleMateriaClick = (materia: string) => {
    if (materia) {
      // Reemplazar espacios por guiones en el nombre de la materia
      const formattedMateria = materia.replace(/\s+/g, '-');
      const url = `${formattedMateria}`;
      navigate(url);
    } else {
      console.error('Nombre de materia no proporcionado');
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="lg">
          Listado de Materias
        </Heading>
        <Box w="full">
          <CustomSelect
            placeholder="Seleccionar Cuatrimestre"
            options={opcionesCuatrimestre}
            value={cuatrimestre.toString()} // Convertimos el número a string para CustomSelect
            onChange={handleSemesterChange}
          />
        </Box>
        {loading ? (
          <Text>Cargando asignaturas...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <Box w="full">
            <List spacing={3}>
              {filteredAsignaturas.map((materia) => (
                <ListItem
                  key={materia.nombre}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => handleMateriaClick(materia.nombre)}
                >
                  <Text fontSize="md" color="gray.700">
                    {materia.nombre}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ListadoMaterias;
