import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createCompromiso } from '../../../../API/Montos';
import ModalCargarDocumento from '../ModalCargarDocumento';
import { CheckIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';


interface Compromiso {
  anio: string | number | Date;
  fecha_carga_comp_pdf: string;
  cuatrimestre: string;
  archivo_pdf_url?: string;
  id_comp_pago: number;
  matricula: number;
  monto_completo: number;
  monto_completo_2venc: number;
  monto_completo_3venc: number;
  cuota_reducida: number;
  cuota_reducida_2venc: number;
  cuota_reducida_3venc: number;
}

interface CardCargaProps {
  compromisos: Compromiso[];
  fetchMontos: () => void;
}

const MontoInput = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: { target: { name: string; value: string } }) => void;
}) => (
  <Flex align="center">
    <Text w="60%">{label}</Text>
    <Input
      type="text"
      name={name}
      value={'$' + value}
      onChange={onChange}
      size="sm"
      bg="white"
    />
  </Flex>
);

const Montos = ({ compromisos, fetchMontos }: CardCargaProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalCargarOpen,
    onOpen: onModalCargarOpen,
    onClose: onModalCargarClose,
  } = useDisclosure();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const sortedMontos = [...compromisos].sort((a, b) => {
      const dateA = new Date(a.fecha_carga_comp_pdf);
      const dateB = new Date(b.fecha_carga_comp_pdf);
      return dateB.getTime() - dateA.getTime();
    });
    sortedMontos[0] ? setTempMonto(sortedMontos[0]) : null;
  }, [compromisos]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString(); 
  };
  

  const [tempMonto, setTempMonto] = useState<Compromiso>({
    anio: getCurrentDateTime(),
    fecha_carga_comp_pdf: '',
    cuatrimestre: '',
    archivo_pdf_url: '',
    id_comp_pago: 0,
    matricula: 0,
    monto_completo: 0,
    monto_completo_2venc: 0,
    monto_completo_3venc: 0,
    cuota_reducida: 0,
    cuota_reducida_2venc: 0,
    cuota_reducida_3venc: 0,
  });

  const toast = useToast();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempMonto({
      ...tempMonto,
      [name]: parseInt(value.replace(/\D/g, ''), 10) || 0,
    });
  };

  const handleSave = async () => {
    if (!selectedFile) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un archivo PDF antes de guardar.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (tempMonto.cuatrimestre === '') {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un cuatrimestre antes de guardar.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await createCompromiso(tempMonto, selectedFile);
     
      onClose();
      toast({
        title: 'Éxito',
        description: 'Compromiso creado exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchMontos();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al crear el compromiso.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };


  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} leftIcon={<AddIcon />}>
        Nuevo Cuatrimestre
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="80%">
          <ModalCloseButton />
          <ModalBody mt={5} mb="10px">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              bg="secundaryBg"
              p={6}
              boxShadow="md"
              maxW="100%"
              mt={4}
              position="relative"
            >
            <Flex justify="space-between" gap="4" pt={{ base: '30px', sm: '20px', md: '10px', lg: '5px', }}>
              <Text mb="20px" fontSize="2xl" fontWeight="bold">
                Cuatrimestre
              </Text>
              <Button
                  bgColor={filePreview ? "green" : undefined}
                  color="white"
                  size="sm"
                  onClick={onModalCargarOpen}
                  leftIcon={filePreview ? <CheckIcon /> : undefined}
                >
                  Cargar Documento
                </Button>
              </Flex>
              <Select
                placeholder= 'Selecciona un cuatrimestre'
                name="cuatrimestre"
                mb="20px"
                bg="white"
                onChange={(e) =>
                  setTempMonto({
                    ...tempMonto,
                    cuatrimestre: e.target.value,
                  })
                }
              >
                <option value="1C">1er Cuatrimestre</option>
                <option value="2C">2do Cuatrimestre</option>
              </Select>
              <SimpleGrid columns={8} spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  Montos
                </Text>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={2}>
                <MontoInput
                  label="Cuota Completa"
                  name="monto_completo"
                  value={tempMonto.monto_completo}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida"
                  name="cuota_reducida"
                  value={tempMonto.cuota_reducida}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Completa 2do Vencimiento"
                  name="monto_completo_2venc"
                  value={tempMonto.monto_completo_2venc}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida 2do Vencimiento"
                  name="cuota_reducida_2venc"
                  value={tempMonto.cuota_reducida_2venc}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Completa 3er Vencimiento"
                  name="monto_completo_3venc"
                  value={tempMonto.monto_completo_3venc}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida 3er Vencimiento"
                  name="cuota_reducida_3venc"
                  value={tempMonto.cuota_reducida_3venc}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Matrícula"
                  name="matricula"
                  value={tempMonto.matricula}
                  onChange={handleChange}
                />
              </SimpleGrid>

              <Flex justify="flex-end" gap="4" pt={{ base: '30px', sm: '20px', md: '10px', lg: '5px', }}>
                <Button color="white" size="sm" onClick={()=>{handleSave()}}>
                  Guardar Cambios
                </Button>
                <Button
                  bgColor={filePreview ? 'green' : undefined}
                  color="white"
                  size="sm"
                  onClick={onModalCargarOpen}
                  leftIcon={filePreview ? <CheckIcon /> : undefined}
                >
                  Cargar Documento
                </Button>
                <Button
                  colorScheme="blue"
                  color="white"
                  size="sm"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalCargarDocumento
        isOpen={isModalCargarOpen}
        onClose={onModalCargarClose}
        setFilePreview={setFilePreview}
        filePreview={filePreview}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </>
  );
};

export default Montos;
