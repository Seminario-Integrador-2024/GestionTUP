import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, Box } from '@chakra-ui/react';
import { LINK_MATERIAS } from './LinksMaterias';

const MateriaDetalle = () => {
    const { url } = useParams();
    const materiaDetalle = LINK_MATERIAS.find(item => item.url === url);

    if (!materiaDetalle) {
        return <Text>No se encontró la materia.</Text>;
    }

    return (
        <Container maxW="container.md" p={4}>
            <Box>
                <Heading as="h1" size="lg">{materiaDetalle.title}</Heading>
                <Text mt={4}>
                    {materiaDetalle.title}.
                </Text>
            </Box>
        </Container>
    );
};

export default MateriaDetalle;

