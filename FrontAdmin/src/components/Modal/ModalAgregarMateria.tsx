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
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  confirmar: (id: string, nombre: string, plan: string) => void;
}
export default function ModalComponentMateria({
  isOpen,
  onClose,
  confirmar,
}: ModalComponentProps) {
  const [idMateria, setIdMateria] = useState('');
  const [nombre, setNombre] = useState('');
  const [plan, setPlan] = useState('');

  const handleconfirmar = () => {
    confirmar(idMateria, nombre, plan);
    setIdMateria('');
    setNombre('');
    setPlan('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Materia</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <Input
                placeholder="ID Materia"
                size="md"
                variant="flushed"
                value={idMateria}
                onChange={(e) => setIdMateria(e.target.value)}
              />
              <Input
                placeholder="Nombre"
                size="md"
                variant="flushed"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Input
                placeholder="Plan"
                size="md"
                variant="flushed"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
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
