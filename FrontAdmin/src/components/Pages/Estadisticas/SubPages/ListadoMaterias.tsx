import React, { useState, ChangeEvent } from 'react';
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
import { LINK_MATERIAS } from '../../../Subjects/LinksMaterias';

type Cuatrimestre = 'primer-cuatrimestre' | 'segundo-cuatrimestre';

const opcionesCuatrimestre = [
  { value: 'primer-cuatrimestre', label: 'Primer Cuatrimestre' },
  { value: 'segundo-cuatrimestre', label: 'Segundo Cuatrimestre' },
];

const materias: Record<Cuatrimestre, string[]> = {
  'primer-cuatrimestre': [
    'Programación I',
    'Arquitectura y Sistemas Operativos',
    'Matemática',
    'Organización Empresarial',
    'Programación III',
    'Base de Datos II',
    'Metodología de Sistemas I',
    'Ingles II',
  ],
  'segundo-cuatrimestre': [
    'Programación II',
    'Probabilidad y Estadistica',
    'Base de Datos',
    'Ingles I',
    'Programación IV',
    'Metodología de Sistemas II',
    'Introducción al Análisis de Datos',
    'Legislación',
    'Gestión de Desarrollo de Software',
    'Trabajo Final Integrador',
  ],
};

interface MateriaLink {
  title: string;
  url: string;
}

const ListadoMaterias: React.FC = () => {
  const [cuatrimestre, setSemester] = useState<Cuatrimestre | ''>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSemester(event.target.value as Cuatrimestre);
  };

  const handleMateriaClick = (materia: string) => {
    const materiaLink = LINK_MATERIAS.find(
      (item: MateriaLink) => item.title === materia
    );

    if (materiaLink) {
      navigate(materiaLink.url);
    } else {
      console.error('URL de materia no encontrada para:', materia);
    }
  };

  const filteredSubjects = cuatrimestre ? materias[cuatrimestre] : [];

  // Extrae los paths de LINK_MATERIAS
  const detailPaths = LINK_MATERIAS.map(link => link.url);

  // Verifica si la ruta actual incluye alguno de los paths de detalle
  const isInDetailView = detailPaths.some(path => location.pathname.includes(path));

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={6} align="start">
        {!isInDetailView && ( // Solo muestra el título si no estamos en una vista de detalle
          <Heading as="h1" size="lg">
            Listado de Materias
          </Heading>
        )}
        {!isInDetailView && ( // Solo muestra el select si no estamos en una vista de detalle
          <Box w="full">
            <CustomSelect
              placeholder="Seleccionar Cuatrimestre"
              options={opcionesCuatrimestre}
              value={cuatrimestre}
              onChange={handleSemesterChange}
            />
          </Box>
        )}
        {!isInDetailView && cuatrimestre && ( // Solo muestra la lista si no estamos en una vista de detalle
          <Box w="full">
            <List spacing={3}>
              {filteredSubjects.map((materia) => (
                <ListItem
                  key={materia}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => handleMateriaClick(materia)}
                >
                  <Text fontSize="md" color="gray.700">
                    {materia}
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
