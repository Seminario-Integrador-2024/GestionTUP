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
    RadioGroup,
    Radio,
    Text,
  } from '@chakra-ui/react';
    import React, { useState } from 'react';
  

  interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (id: string, anio_cursada: string, nombre: string, plan: string, cuatrimestre:string) => void;
  }
  export default function ModalComponentMateria({
    isOpen,
    onClose,
    confirmar,
  }: ModalComponentProps) {
  
    const [idMateria, setIdMateria] = useState('');
    const [nombre, setNombre] = useState('');
    const [plan, setPlan] = useState('');
    const [cuatrimestre, setCuatrimestre] = useState('');
    const [anio_cursada, setAnioCursada] = useState('');

    const handleconfirmar = () => {
      confirmar(idMateria, anio_cursada, nombre, plan, cuatrimestre);
      setIdMateria('');
      setNombre('');
      setPlan('');
      setCuatrimestre('');
      setAnioCursada('');
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
                <Stack direction="row">
                  <Input
                    placeholder='ID Materia'
                    size='md'
                    variant="flushed"
                    value={idMateria}
                    onChange={(e) => setIdMateria(e.target.value)}
                  />
                  <Input
                    placeholder='Nombre'
                    size='md'
                    variant="flushed"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Stack>
                < Stack direction="row" mt={5} alignItems="center">
                  <Input
                    placeholder='Año'
                    size='md'
                    w="50%"
                    variant="flushed"
                    value={anio_cursada}
                    onChange={(e) => setAnioCursada(e.target.value)}
                  />
                  <Stack direction="column">
                  <Text>Cuatrimestre</Text>
                  <RadioGroup defaultValue="1" onChange={(value) => setCuatrimestre(value.toString())}>
                    <Stack direction="row">
                      <Radio value="1">1</Radio>
                      <Radio value="2">2</Radio>
                    </Stack>
                  </RadioGroup> 
                  </Stack>
                </Stack>
                <Input
                  placeholder='Plan'
                  size='md'
                  variant="flushed"
                  value={plan}
                  mt={5}
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