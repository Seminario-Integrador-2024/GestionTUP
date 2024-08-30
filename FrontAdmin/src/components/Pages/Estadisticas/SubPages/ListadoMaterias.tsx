import React, { useState, ChangeEvent } from 'react';
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
        'Metodología de Sistemas II',
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

    const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSemester(event.target.value as Cuatrimestre);
    };

    const handleMateriaClick = (materia: string) => {
        const materiaLink = LINK_MATERIAS.find(
            (item: MateriaLink) => item.title === materia
        );

        if (materiaLink) {
            const url = `${materiaLink.url}`;
            navigate(url);
        } else {
            console.error('URL de materia no encontrada para:', materia);
        }
    };

    const filteredSubjects = cuatrimestre ? materias[cuatrimestre] : [];

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
                {cuatrimestre && (
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
            </VStack>
        </Container>
    );
};

export default ListadoMaterias;
