import {Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, Text, ModalFooter, ModalHeader, ModalOverlay, Input, FormControl, FormLabel, IconButton, InputGroup, InputRightElement, FormErrorMessage} from '@chakra-ui/react';
import { FetchDetalleAlumno } from '../../API/DetalleAlumno';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import React from 'react';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
};

export default function Contraseña({ isOpen, onClose }: ModalComponentProps) {


    const [data, setData] = useState<any>([]);
    const [Contraseña, setContraseña] = useState('');
    const [Contraseña2, setContraseña2] = useState('');
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [show2, setShow2] = React.useState(false)
    const handleClick2 = () => setShow2(!show2)
    const [error, setError] = useState('');
   

    useEffect (() => {
        const fetchDetalleAlumno = async () => {
            try {
                const dni = Cookies.get('dni');
                const data = await FetchDetalleAlumno(parseInt(dni!));
                setData(data);
               
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetalleAlumno();
        setContraseña('');
        setContraseña2('');
        setError('');
    }, [isOpen]);

    const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContraseña(e.target.value);
      };
    
      const handleContraseña2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContraseña2(e.target.value);
      };
    
    const handleConfirmar = () => {
        if (Contraseña !== Contraseña2) {
          setError('Las contraseñas no coinciden');
          return;
        };
        const fetchCambiarContraseña = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/auth/password/change/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('tokennn')}`,
                    },
                    body: JSON.stringify({
                        new_password1: Contraseña,
                        new_password2: Contraseña2,
                    }),
                });
                if (response.ok) {
                    onClose();
                } else {
                    setError('Error al cambiar la contraseña');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCambiarContraseña();
        onClose();
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cambiar Contraseña</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <FormControl isInvalid={!!error}>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Ingrese Nueva Contraseña'
                                value={Contraseña}
                                onChange={handleContraseñaChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' variant={'light'} borderRadius={3} onClick={handleClick}>
                                {show ? 'Ocultar' : 'Mostrar'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='md' mt={4}>
                            <Input
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='Repetir Contraseña'
                                value={Contraseña2}
                                onChange={handleContraseña2Change}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' variant={'light'} borderRadius={3} onClick={handleClick2}>
                                {show2 ? 'Ocultar' : 'Mostrar'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter justifyContent={"flex-end"}>
                    <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleConfirmar}
                    size="sm"
                    >
                    Aceptar
                    </Button>
                    <Button
                    colorScheme="blue"
                    onClick={onClose}
                    variant="light"
                    size="sm"
                    >
                    Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
