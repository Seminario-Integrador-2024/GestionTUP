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
} from '@chakra-ui/react';
import CustomSelect from './Seleccion';
import { FetchMaterias } from '../../../../API/Materias';

type Cuatrimestre = 'primer-cuatrimestre' | 'segundo-cuatrimestre';

const opcionesCuatrimestre = [
  { value: 'primer-cuatrimestre', label: 'Primer Cuatrimestre' },
  { value: 'segundo-cuatrimestre', label: 'Segundo Cuatrimestre' },
];

interface Materia {
  anio_cursada: number;
  anio_plan: number;
  codigo_materia: number;
  cuatrimestre: number;
  nombre: string;
}

const ListadoMaterias: React.FC = () => {
  const [cuatrimestre, setCuatrimestre] = useState<Cuatrimestre | ''>(''); // Estado para el cuatrimestre
  const [materias, setMaterias] = useState<Materia[]>([]); // Estado para las materias
  const navigate = useNavigate();

  // Maneja el cambio de selección del cuatrimestre
  const handleSemesterChange = (value: string) => {
    setCuatrimestre(value as Cuatrimestre);
  };

  // Filtra las materias según el cuatrimestre seleccionado
  const filteredSubjects = Array.isArray(materias)
    ? materias.filter((materia) => {
        if (cuatrimestre === 'primer-cuatrimestre') {
          return materia.cuatrimestre === 1;
        }
        if (cuatrimestre === 'segundo-cuatrimestre') {
          return materia.cuatrimestre === 2;
        }
        return false;
      })
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaterias();
        console.log('Materias recibidas:', data); // Verifica los datos
        if (data && Array.isArray(data.results)) {
          setMaterias(data.results); // Extrae las materias del campo `results`
        } else {
          console.error('Datos inválidos:', data);
          setMaterias([]); // Respaldo a un array vacío si los datos son inválidos
        }
      } catch (error) {
        console.error('Network error:', error);
        setMaterias([]); // Respaldo a un array vacío si ocurre un error
      }
    };
    fetchData();
  }, []);

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
            value={cuatrimestre}
            onChange={(event) => handleSemesterChange(event.target.value)} // Asegúrate de pasar el valor correcto
          />
        </Box>
        {cuatrimestre && (
          <Box w="full">
            <List spacing={3}>
              {filteredSubjects.map((materia) => (
                <ListItem
                  key={materia.codigo_materia}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => navigate(`${materia.codigo_materia}`)}
                >
                  <Text fontSize="md" color="gray.700">
                    {materia.nombre}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Outlet />
      </VStack>
    </Container>
  );
};

export default ListadoMaterias;
