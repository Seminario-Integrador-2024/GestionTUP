import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, Text, useDisclosure, IconButton} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'; 
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import ModalComponentMateria from '../../../Modal/ModalAgregarMateria';
import ModalEditarMateria from '../../../Modal/ModalEditarMateria';
import { FetchPostMateria, FetchMaterias, FetchPutMateria, FetchDeleteMateria} from '../../../../API/Materias';
import { useToast } from '../../../Toast/useToast';

export default function TablaMaterias() {
    const [materias, setMaterias] = useState<any[]>([]);
    const [selectedMateria, setSelectedMateria] = useState<any>(null);
    const [selectedMateriaEditar, setSelectedMateriaEditar] = useState<any>(null);
    const showToast = useToast();
    //Eliminar
    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onClose: onClose1,
    } = useDisclosure();
    //Agregar
    const {
        isOpen: isOpen2,
        onOpen: onOpen2,
        onClose: onClose2,
    } = useDisclosure();
    //Editar
    const {
        isOpen: isOpen3,
        onOpen: onOpen3,
        onClose: onClose3,
    } = useDisclosure();

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
      showToast('Exito', 'Materia eliminada con exito', 'success');
      setMaterias((prevMaterias) =>
        prevMaterias.filter((m) => m.codigo_materia !== selectedMateria.codigo_materia)
      ); // Elimina del estado
    } catch (error) {
      console.error('Network error', error);
      showToast('Error', 'No se pudo eliminar la materia', 'error');
    }
    onClose1();
  };

    const handleAgregar = (codigo_materia: string, anio_cursada: string, nombre: string, anio_plan: string, cuatrimestre:string) => {
         // Validar si todos los campos están completos
      if (!codigo_materia || !anio_cursada || !nombre || !anio_plan || !cuatrimestre) {
        showToast('Error', 'No se pudo agregar la materia, todos los campos deben ser completados', 'error');
        return;
    }
        // Aca la solicitud POST para agregar la materia
        try {
            console.log({ codigo_materia, anio_plan, nombre });
            const Data = FetchPostMateria(parseInt(codigo_materia), parseInt(anio_cursada), parseInt(anio_plan), nombre, parseInt(cuatrimestre));
            console.log(Data);
            showToast('Exito', 'Materia agregada con exito', 'success');
          } catch (error) {
            console.error('Network error', error);
            showToast('Error', 'No se pudo agregar la materia', 'error');
        }
        setMaterias([...materias, { codigo_materia, anio_cursada, anio_plan, nombre, cuatrimestre }]);
        onClose2();
    }

    const handleEditar = (materia: any) => {
        setSelectedMateriaEditar(materia);
        onOpen3();
    };

    const handleConfirmarEditar = (codigo_materia:string, anio_cursado:string, nombre: string, cuatrimestre:string, anio_plan: string) => {
      if (!codigo_materia || !anio_cursado || !nombre || !anio_plan || !cuatrimestre) {
        showToast('Error', 'No se pudo editar la materia, todos los campos deben ser completados', 'error');
        return;
      }
        // Aca la solicitud PUT para editar la materia
        try {
            const Data = FetchPutMateria(parseInt(codigo_materia), parseInt(anio_cursado), parseInt(anio_plan), nombre, parseInt(cuatrimestre));
            console.log(Data);  
            showToast('Exito', 'Materia editada con exito', 'success');

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
    }

   // onClose3();
  //};

  return (
        <Box>
                <Box>
                <Flex justifyContent="center" mb={4}>
                    <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onOpen2}>Agregar Materia</Button>
                </Flex>
                <Table variant="simple">
                    <Thead>
                        <Tr bg="secundaryBg">
                            <Th>Cod. Materia</Th>
                            <Th>Nombre</Th>
                            
                            <Th>Cuatrimestre</Th>
                            <Th>Plan</Th>
                            <Th textAlign="center">Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {materias.map((materia, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? "white" : "secundaryBg"} height="15px">
                                <Td>{materia.codigo_materia}</Td>
                                <Td>{materia.nombre}</Td>
                                
                                <Td textAlign={"center"}>{materia.cuatrimestre}</Td>
                                <Td>{materia.anio_plan}</Td>
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
      
  );
  
}
