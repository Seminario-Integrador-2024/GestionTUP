import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  confirmar: (id: string, nombre: string, plan: string) => void;
  materia: any;
}
export default function ModalEditarMateria({
  isOpen,
  onClose,
  confirmar,
  materia,
}: ModalComponentProps) {
  const handleconfirmar = () => {
    confirmar(id, nombre, plan);
    setId('');
    setNombre('');
    setPlan('');
    onClose();
  };

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (materia) {
      setId(materia.id);
      setNombre(materia.nombre);
      setPlan(materia.plan);
    }
  }, [materia]);

  if (!materia) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar {materia.nombre}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Flex direction="column">
                <Text>ID Materia</Text>
                <Input
                  value={id}
                  placeholder="Materia ID"
                  size="md"
                  onChange={(e) => setId(e.target.value)}
                  variant="flushed"
                  ml={1}
                />
              </Flex>
              <Flex direction="column" mt="10px">
                <Text mb={0}>Nombre</Text>
                <Input
                  value={nombre}
                  placeholder="Nombre"
                  size="md"
                  onChange={(e) => setNombre(e.target.value)}
                  variant="flushed"
                  ml={1}
                />
              </Flex>
              <Flex direction="column" mt="10px">
                <Text mb={0}>Plan</Text>
                <Input
                  value={plan}
                  placeholder="Plan"
                  size="md"
                  onChange={(e) => setPlan(e.target.value)}
                  variant="flushed"
                  ml={1}
                />
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleconfirmar}
              size="sm"
            >
              Aceptar
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              variant="light"
              size="sm"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
