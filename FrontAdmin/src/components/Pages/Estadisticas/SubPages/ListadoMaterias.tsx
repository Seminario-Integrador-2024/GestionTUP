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
import { FetchAlumnosMaterias } from '../../../../API/Materias' // Asumo que tienes esta función en tu API

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
  const [alumnos, setAlumnos] = useState([]); // Estado para los alumnos
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
      <VStack spacing={6} align="start" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" p={4} py={12}>
        <Heading as="h1" size="lg" fontSize="3xl" fontWeight="bold" mb={3}>
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
                  onClick={() => handleMateriaClick(materia.codigo_materia)} // Llama a la función cuando se haga clic
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
