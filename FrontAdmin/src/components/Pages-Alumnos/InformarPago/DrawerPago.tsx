import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Text,
    Stack,
    Flex,
  } from '@chakra-ui/react'
import { useState} from 'react'
import {AttachmentIcon} from '@chakra-ui/icons';

interface Cuota {
    id: number;
    numero: string;
    monto1erVencimiento: number;
    monto2doVencimiento: number;
    monto3erVencimiento: number;
    valortotal: number;
    valorpagado: number;
    valoradeudado: number;
    estado: string;
  }

interface DrawerInformarProps {
    isOpen: boolean;
    onClose: () => void;
    cuotasseleccionadas: Cuota[];
}

const DrawerInformar: React.FC<DrawerInformarProps> = ({ isOpen, onClose, cuotasseleccionadas }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        setFile(file);
    };

    const handleSave = () => {
        console.log("las cuotas seleccionadas son:", cuotasseleccionadas);
        onClose();
    };

    const handleCancel = () => {
        setFile(null)
        onClose();
    }

    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Informa tu pago</DrawerHeader>
  
            <DrawerBody>
            <FormControl isRequired>
                <FormLabel>Monto Abonado</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                      $
                    </InputLeftElement>
                    <Input placeholder='' />
                </InputGroup>
            
            <Button mt={4} color="white" rightIcon={<AttachmentIcon/>} onClick={() => document.getElementById('fileInput')?.click()}>
                Adjuntar Comprobante
            </Button>
            <Input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
             {file && <Stack direction="column">
                <Text fontWeight="bold" mt={6}>Archivo cargado:</Text> 
                <Flex ml={1}><li>{file.name}</li> </Flex>
            </Stack>}
            </FormControl>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='light' mr={3} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button colorScheme='blue' onClick={handleSave}>Guardar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default DrawerInformar;