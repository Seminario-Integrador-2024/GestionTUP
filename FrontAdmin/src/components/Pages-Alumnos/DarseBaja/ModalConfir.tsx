import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  texto: string;
  confirmar: (motivo: string) => void;
}

export default function ModalConfirmar({
  isOpen,
  onClose,
  texto,
  confirmar,
}: ModalComponentProps) {
  const [motivo, setMotivo] = useState('');

  const handleConfirmar = () => {
    confirmar(motivo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar cambios</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>{texto}</Text>
          <FormControl>
            <FormLabel>Motivo de la baja</FormLabel>
            <Input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Escribe el motivo aquí"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirmar} size="sm">
            Aceptar
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose} variant="light" size="sm">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}