import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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
  const [cuatrimestre, setSemester] = useState<Cuatrimestre | ''>('');
  const [materias, setMaterias] = useState<Materia[]>([]); // Estado para las materias
  const navigate = useNavigate();
  const location = useLocation();

  // Maneja el cambio de selección del cuatrimestre
  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSemester(event.target.value as Cuatrimestre);
  };

  // Filtra las materias según el cuatrimestre seleccionado
  const filteredSubjects = materias.filter((materia: Materia) => {
    if (cuatrimestre === 'primer-cuatrimestre') {
      return materia.cuatrimestre === 1;
    }
    if (cuatrimestre === 'segundo-cuatrimestre') {
      return materia.cuatrimestre === 2;
    }
    return false; // Si no hay cuatrimestre seleccionado
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaterias();
        setMaterias(data); // Actualiza el estado con las materias obtenidas
        console.log(data);
      } catch (error) {
        console.error('Network error', error);
        // showToast('Error', 'No se pudieron cargar las materias', 'error');
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
            onChange={handleSemesterChange}
          />
        </Box>
        {cuatrimestre && ( // Solo muestra la lista si no estamos en una vista de detalle
          <Box w="full">
            <List spacing={3}>
              {filteredSubjects.map((materia) => (
                <ListItem
                  key={materia.codigo_materia} // Utiliza codigo_materia como clave única
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => navigate(`${materia.codigo_materia}`)}
                >
                  <Text fontSize="md" color="gray.700">
                    {materia.nombre} {/* Muestra el nombre de la materia */}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Outlet />{' '}
        {/* Outlet para renderizar rutas hijas, como la vista de detalle */}
      </VStack>
    </Container>
  );
};

export default ListadoMaterias;
