import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import API from '../../../../API/Materias';
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import ModalComponentMateria from '../../../Modal/ModalAgregarMateria';
import ModalEditarMateria from '../../../Modal/ModalEditarMateria';

export default function TablaMaterias() {
  const [materias, setMaterias] = useState<any[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<any>(null);
  const [selectedMateriaEditar, setSelectedMateriaEditar] = useState<any>(null);
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
    setMaterias(API);
  }, []);

  const handleBorrar = (materia: any) => {
    setSelectedMateria(materia);
    onOpen1();
  };

  const handleConfirmarBorrado = () => {
    setMaterias(materias.filter((m) => m.id !== selectedMateria.id)); //Elimina del json ya traido asi no hace falta volver a hacer un GET
    // Aca la solicitud DELETE para eliminar la materia
    onClose1();
  };

  const handleAgregar = (id: string, nombre: string, plan: string) => {
    // Aca la solicitud GET para agregar la materia
    setMaterias([...materias, { id, nombre, plan }]);
    onClose2();
  };

  const handleEditar = (materia: any) => {
    setSelectedMateriaEditar(materia);
    onOpen3();
  };

  const handleConfirmarEditar = (id: string, nombre: string, plan: string) => {
    // Aca la solicitud PUT para editar la materia

    const index = materias.findIndex((materia) => materia.id === id);
    if (index !== -1) {
      const newMaterias = [...materias];
      newMaterias[index] = { ...newMaterias[index], nombre, plan };
      setMaterias(newMaterias);
    }

    onClose3();
  };

  return (
    <Box>
      {materias.length > 0 ? (
        <Box>
          <Flex justifyContent="center" mb={4}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="green"
              onClick={onOpen2}
            >
              Agregar Materia
            </Button>
          </Flex>
          <Table variant="simple">
            <Thead>
              <Tr bg="secundaryBg">
                <Th>ID Materia</Th>
                <Th>Nombre</Th>
                <Th>Plan</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {materias.map((materia, index) => (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? 'white' : 'secundaryBg'}
                  h={0.5}
                >
                  <Td>{materia.id}</Td>
                  <Td>{materia.nombre}</Td>
                  <Td>{materia.plan}</Td>
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
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
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
