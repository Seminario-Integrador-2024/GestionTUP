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
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import ModalComponentMateria from '../../../Modal/ModalAgregarMateria';
import ModalEditarMateria from '../../../Modal/ModalEditarMateria';
import {
  FetchPostMateria,
  FetchMaterias,
  FetchPutMateria,
  FetchDeleteMateria,
} from '../../../../API/Materias';
import { useToast } from '../../../Toast/useToast';

interface Materia {
  codigo_materia: number;
  nombre: string;
  anio_cursada: number;
  cuatrimestre: number;
  anio_plan: number;
}

export default function TablaMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [selectedMateriaEditar, setSelectedMateriaEditar] =
    useState<Materia | null>(null);
  const showToast = useToast();

  // Modal handlers
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaterias();
        setMaterias(data);
      } catch (error) {
        console.error('Error fetching materias:', error);
        showToast('Error', 'No se pudieron cargar las materias', 'error');
      }
    };
    fetchData();
  }, [showToast]);

  const handleBorrar = (materia: Materia) => {
    setSelectedMateria(materia);
    onOpen1();
  };

  const handleConfirmarBorrado = async () => {
    if (selectedMateria) {
      try {
        await FetchDeleteMateria(selectedMateria.codigo_materia);
        showToast('Éxito', 'Materia eliminada con éxito', 'success');
        setMaterias(
          materias.filter(
            (m) => m.codigo_materia !== selectedMateria.codigo_materia
          )
        );
      } catch (error) {
        console.error('Error deleting materia:', error);
        showToast('Error', 'No se pudo eliminar la materia', 'error');
      }
      onClose1();
    }
  };

  const handleAgregar = async (
    codigo_materia: string,
    anio_cursada: string,
    nombre: string,
    anio_plan: string,
    cuatrimestre: string
  ) => {
    try {
      // Convertir cadenas a números
      const codigo = parseInt(codigo_materia, 10);
      const anioCursada = parseInt(anio_cursada, 10);
      const anioPlan = parseInt(anio_plan, 10);
      const cuatrimestreNum = parseInt(cuatrimestre, 10);

      // Pasar los números a la función
      await FetchPostMateria(
        codigo,
        anioCursada,
        anioPlan,
        nombre,
        cuatrimestreNum
      );
      showToast('Éxito', 'Materia agregada con éxito', 'success');

      setMaterias([
        ...materias,
        {
          codigo_materia: codigo,
          anio_cursada: anioCursada,
          anio_plan: anioPlan,
          nombre,
          cuatrimestre: cuatrimestreNum,
        },
      ]);
    } catch (error) {
      console.error('Error adding materia:', error);
      showToast('Error', 'No se pudo agregar la materia', 'error');
    }
    onClose2();
  };

  const handleEditar = (materia: Materia) => {
    setSelectedMateriaEditar(materia);
    onOpen3();
  };

  const handleConfirmarEditar = async (
    codigo_materia: string,
    anio_cursado: string,
    nombre: string,
    cuatrimestre: string,
    anio_plan: string
  ) => {
    try {
      // Convertir cadenas a números
      const codigo = parseInt(codigo_materia, 10);
      const anioCursado = parseInt(anio_cursado, 10);
      const anioPlan = parseInt(anio_plan, 10);
      const cuatrimestreNum = parseInt(cuatrimestre, 10);

      await FetchPutMateria(
        codigo,
        anioCursado,
        anioPlan,
        nombre,
        cuatrimestreNum
      );
      showToast('Éxito', 'Materia editada con éxito', 'success');

      const index = materias.findIndex(
        (materia) => materia.codigo_materia === codigo
      );
      if (index !== -1) {
        const newMaterias = [...materias];
        newMaterias[index] = {
          codigo_materia: codigo,
          anio_cursada: anioCursado,
          anio_plan: anioPlan,
          nombre,
          cuatrimestre: cuatrimestreNum,
        };
        setMaterias(newMaterias);
      }
    } catch (error) {
      console.error('Error editing materia:', error);
      showToast('Error', 'No se pudo editar la materia', 'error');
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
                <Th>Año</Th>
                <Th>Cuatrimestre</Th>
                <Th>Plan</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {materias.map((materia, index) => (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? 'white' : 'secundaryBg'}
                  height="15px"
                >
                  <Td>{materia.codigo_materia}</Td>
                  <Td>{materia.nombre}</Td>
                  <Td>{materia.anio_cursada}</Td>
                  <Td>{materia.cuatrimestre}</Td>
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
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
    </Box>
  );
}
