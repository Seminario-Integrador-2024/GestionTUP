import {Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, Text, ModalFooter, ModalHeader, ModalOverlay, Input, FormControl, FormLabel, IconButton} from '@chakra-ui/react';
import { HiOutlineUserCircle } from "react-icons/hi";
import {EditIcon} from '@chakra-ui/icons';
import { FetchDetalleAlumno } from '../../API/DetalleAlumno';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: () => void;
}

export default function Perfil({ isOpen, onClose, confirmar }: ModalComponentProps) {

    const handleconfirmar = () => {
        confirmar();
        onClose();
    };

    const [data, setData] = useState<any>([]);
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isTelefonoEditable, setIsTelefonoEditable] = useState(false);

    useEffect (() => {
        const fetchDetalleAlumno = async () => {
            try {
                const dni = Cookies.get('dni');
                const data = await FetchDetalleAlumno(parseInt(dni!));
                setData(data);
                setEmail(data.email);  
                setTelefono(data.telefono);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetalleAlumno();
        setIsEmailEditable(false);
        setIsTelefonoEditable(false);
        
    }, [isOpen]);

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleTelefonoChange = (e: any) => {
        setTelefono(e.target.value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Perfil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
                    <Flex direction={"row"} alignItems={"center"}>
                        < HiOutlineUserCircle size={120} />
                        <Flex direction={"column"} ml={5} textAlign={"left"}>
                            <Text fontWeight={"bold"} fontSize={20}>{ (data.full_name)}</Text>
                            <Text fontSize={18}>{ new Intl.NumberFormat('es-Es').format(data.dni)}</Text>
                            <Text fontSize={18}>{data.legajo}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction={"column"} mt={5} flex={1} w={"100%"}>
                        <FormControl>
                            <Flex direction={"column"}>
                                <FormLabel mb={0}>Email:</FormLabel>
                                <Flex>
                                    <Input
                                        value={email}
                                        placeholder=''
                                        onChange={handleEmailChange}
                                        isReadOnly={!isEmailEditable}
                                        color={isEmailEditable ?  'black' : 'gray.500'}
                                    />
                                    <IconButton 
                                            icon={<EditIcon />}
                                            variant={'light'}
                                            borderRadius={3}
                                            color={isEmailEditable ?  'gray.500' : 'black'}
                                            ml={1} onClick={() => setIsEmailEditable(!isEmailEditable)} aria-label={''}>
                                    </IconButton>
                                </Flex>
                            </Flex>
                            <Flex direction={"column"} mt={3}>
                            <FormLabel mb={0}>Telefono:</FormLabel>
                                <Flex>
                                <Input
                                        value={telefono}
                                        placeholder=''
                                        onChange={handleTelefonoChange}
                                        isReadOnly={!isTelefonoEditable}
                                        color={isTelefonoEditable ?  'black' : 'gray.500'}
                                    />
                                    <IconButton 
                                            icon={<EditIcon />}
                                            variant={'light'}
                                            borderRadius={3}
                                            color={isTelefonoEditable ?  'gray.500' : 'black'}
                                            ml={1} onClick={() => setIsTelefonoEditable(!isTelefonoEditable)} aria-label={''}>
                                    </IconButton>
                                </Flex>
                            </Flex>
                        </FormControl>
                    </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter justifyContent={"flex-end"}>
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
