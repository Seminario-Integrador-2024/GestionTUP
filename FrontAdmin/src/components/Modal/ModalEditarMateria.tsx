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
    confirmar: (codigo_materia:string, anio_cursado:string, nombre: string, cuatrimestre:string, anio_plan: string) => void;
    materia: any;
  }
  export default function ModalEditarMateria({ isOpen, onClose, confirmar, materia, }: ModalComponentProps) {
   
    const handleconfirmar = () => {
      confirmar(codigo_materia, anio_cursado, nombre, cuatrimestre, plan);
      onClose();
    };

    const [codigo_materia, setCodigoMateria] = useState('');
    const [nombre, setNombre] = useState('');
    const [cuatrimestre, setCuatrimestre] = useState('');
    const [plan, setPlan] = useState('');
    const [anio_cursado, setAnioCursado] = useState('');

    useEffect(() => {
        if (materia) {
        setCodigoMateria(materia.codigo_materia);
        setNombre(materia.nombre);
        setCuatrimestre(materia.cuatrimestre);
        setPlan(materia.anio_plan);
        setAnioCursado(materia.anio_cursada);
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
                        value={codigo_materia}
                        placeholder="Materia ID"
                        size='md'
                        onChange={(e) => setCodigoMateria(e.target.value)}
                        variant = "flushed"
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
                <Text mb={0}>Año</Text>
                <Input
                    value={anio_cursado}
                    placeholder="Año"
                    size='md'
                    onChange={(e) => setAnioCursado(e.target.value)}
                    variant = "flushed"
                    ml={1}
                />
                </Flex>
                <Flex direction="column" mt="10px">
                <Text mb={0}>Cuatrimestre</Text>
                <Input
                    value={cuatrimestre}
                    placeholder="Cuatrimestre"
                    size='md'
                    onChange={(e) => setCuatrimestre(e.target.value)}
                    variant = "flushed"
                    ml={1}
                />
                </Flex>
                <Flex direction="column" mt="10px">
                <Text  mb={0}>Plan</Text>
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
