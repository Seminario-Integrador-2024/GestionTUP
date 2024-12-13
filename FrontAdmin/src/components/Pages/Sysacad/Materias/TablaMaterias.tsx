import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, useDisclosure, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'; 
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import ModalComponentMateria from '../../../Modal/ModalAgregarMateria';
import ModalEditarMateria from '../../../Modal/ModalEditarMateria';
import { FetchPostMateria, FetchMaterias, FetchPutMateria, FetchDeleteMateria } from '../../../../API/Materias';
import { useToast } from '../../../Toast/useToast';

export default function TablaMaterias() {
    const [materias, setMaterias] = useState<any[]>([]);
    const [selectedMateria, setSelectedMateria] = useState<any>(null);
    const [selectedMateriaEditar, setSelectedMateriaEditar] = useState<any>(null);
    const showToast = useToast();

    //Eliminar
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    //Agregar
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    //Editar
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchMaterias();
                setMaterias(data.results);
                console.log(data);
            } catch (error) {
                console.error('Network error', error);
                showToast('Error', 'No se pudieron cargar las materias', 'error');
            }
        };
        fetchData();
    }, []);

    const handleBorrar = (materia: any) => {
        setSelectedMateria(materia);
        onOpen1();
    };

    const handleConfirmarBorrado = async () => {
        try {
            await FetchDeleteMateria(selectedMateria.codigo_materia);
            showToast('Éxito', 'Materia eliminada con éxito', 'success');
            setMaterias((prevMaterias) =>
                prevMaterias.filter((m) => m.codigo_materia !== selectedMateria.codigo_materia)
            );
        } catch (error) {
            console.error('Network error', error);
            showToast('Error', 'No se pudo eliminar la materia', 'error');
        }
        onClose1();
    };

    const handleAgregar = (codigo_materia: string, anio_cursada: string, nombre: string, anio_plan: string, cuatrimestre: string) => {
        if (!codigo_materia || !anio_cursada || !nombre || !anio_plan || !cuatrimestre) {
            showToast('Error', 'No se pudo agregar la materia, todos los campos deben ser completados', 'error');
            return;
        }
        try {
            console.log({ codigo_materia, anio_plan, nombre });
            const Data = FetchPostMateria(parseInt(codigo_materia), parseInt(anio_cursada), parseInt(anio_plan), nombre, parseInt(cuatrimestre));
            console.log(Data);
            showToast('Éxito', 'Materia agregada con éxito', 'success');
        } catch (error) {
            console.error('Network error', error);
            showToast('Error', 'No se pudo agregar la materia', 'error');
        }
        setMaterias([...materias, { codigo_materia, anio_cursada, anio_plan, nombre, cuatrimestre }]);
        onClose2();
    };

    const handleEditar = (materia: any) => {
        setSelectedMateriaEditar(materia);
        onOpen3();
    };

    const handleConfirmarEditar = (codigo_materia: string, anio_cursado: string, nombre: string, cuatrimestre: string, anio_plan: string) => {
        if (!codigo_materia || !anio_cursado || !nombre || !anio_plan || !cuatrimestre) {
            showToast('Error', 'No se pudo editar la materia, todos los campos deben ser completados', 'error');
            return;
        }
        try {
            const Data = FetchPutMateria(parseInt(codigo_materia), parseInt(anio_cursado), parseInt(anio_plan), nombre, parseInt(cuatrimestre));
            console.log(Data);
            showToast('Éxito', 'Materia editada con éxito', 'success');

            const index = materias.findIndex(materia => materia.codigo_materia === parseInt(codigo_materia));
            if (index !== -1) {
                const newMaterias = [...materias];
                newMaterias[index] = {
                    ...newMaterias[index],
                    codigo_materia: parseInt(codigo_materia),
                    anio_cursada: parseInt(anio_cursado),
                    anio_plan: parseInt(anio_plan),
                    nombre,
                    cuatrimestre: parseInt(cuatrimestre)
                };
                setMaterias(newMaterias);
            }
        } catch (error) {
            console.error('Network error', error);
            showToast('Error', 'No se pudo editar la materia', 'error');
        }

        onClose3();
    };

    return (
        <Flex justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={4} maxWidth={'900px'}>
            <Flex justifyContent="center" mb={4}>
                <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onOpen2}>Agregar Materia</Button>
            </Flex>

            <Box overflowX="auto" width="100%">
                <Table variant="simple">
                    <Thead>
                        <Tr bg="secundaryBg">
                            {/* Cod. Materia visible entre 480px y 768px */}
                            <Th 
                                textAlign="center" 
                                fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                                display={{ base: 'table-cell', sm: 'table-cell', md: 'table-cell' }} // Asegura que se vea entre 480px y 768px
                            >
                                Cod. Materia
                            </Th>
                            <Th 
                                textAlign="center" 
                                fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                            >
                                Nombre
                            </Th>
                            <Th 
                                textAlign="center" 
                                fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                            >
                                Cuatrimestre
                            </Th>
                            <Th 
                                textAlign="center" 
                                fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                            >
                                Plan
                            </Th>
                            <Th 
                                textAlign="center" 
                                fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                            >
                                Acciones
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {materias.map((materia, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? "white" : "secundaryBg"} height="15px">
                                <Td 
                                    fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                    padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                                >
                                    {materia.codigo_materia}
                                </Td>
                                <Td 
                                    fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                    padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                                >
                                    {materia.nombre}
                                </Td>
                                <Td 
                                    textAlign="center" 
                                    fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                    padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                                >
                                    {materia.cuatrimestre}
                                </Td>
                                <Td 
                                    fontSize={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }} 
                                    padding={{ base: '6px', sm: '8px', md: '10px', lg: '12px' }}
                                >
                                    {materia.anio_plan}
                                </Td>
                                <Td>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                            colorScheme="blue"
                                            mr="2"
                                            onClick={() => handleEditar(materia)}
                                        />
                                        <IconButton
                                            aria-label="Eliminar"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            variant="light"
                                            onClick={() => handleBorrar(materia)}
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <ModalComponent
                isOpen={isOpen1}
                onClose={onClose1}
                texto={`¿Estás seguro que deseas eliminar ${selectedMateria?.nombre}?`}
                confirmar={handleConfirmarBorrado}
            />
            <ModalComponentMateria
                isOpen={isOpen2}
                onClose={onClose2}
                confirmar={handleAgregar}
            />
            <ModalEditarMateria
                isOpen={isOpen3}
                onClose={onClose3}
                confirmar={handleConfirmarEditar}
                materia={selectedMateriaEditar}
            />
        </Box>
        </Flex>
    );
}
