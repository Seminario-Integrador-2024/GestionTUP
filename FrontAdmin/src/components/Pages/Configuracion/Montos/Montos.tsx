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
  ModalFooter,
  Select,
  Grid,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { createCompromiso } from '../../../../API/Montos';
import ModalCargarDocumento from '../ModalCargarDocumento';

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
  fecha_vencimiento_1: number;
  fecha_vencimiento_2: number;
  fecha_vencimiento_3: number;
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
  <Flex direction="column">
    <Text mb={1}>{label}</Text>
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

const DateSelect = ({
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
  <Flex align="center" mb={4}>
    <Text  mb={1}>{label}</Text>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      size="sm"
      bg="white"
    >
      {Array.from({ length: 29 }, (_, i) => i + 1).map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </Select>
  </Flex>
);

const Montos = ({ compromisos, fetchMontos }: CardCargaProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalCargarOpen, onOpen: onModalCargarOpen, onClose: onModalCargarClose } = useDisclosure();
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
    fecha_vencimiento_1: 10,
    fecha_vencimiento_2: 15,
    fecha_vencimiento_3: 20,
  });

  const toast = useToast();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name.includes('monto') || name === 'matricula' || name.includes('cuota')) {
      setTempMonto({
        ...tempMonto,
        [name]: parseInt(value.replace(/\D/g, ''), 10) || 0,
      });
    } else if (name.includes('fecha_vencimiento')) {
      setTempMonto({
        ...tempMonto,
        [name]: parseInt(value, 10) || 0,
      });
    } 
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
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent maxW="80%" mt="10px" >
          <ModalCloseButton />
          <ModalBody mt={5} mb="10px">
            <Flex justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">Cuatrimestre</Text>
              <Button
                bgColor={filePreview ? 'green' : undefined}
                color="white"
                size="sm"
                onClick={onModalCargarOpen}
                leftIcon={filePreview ? <CheckIcon /> : undefined}
                mr={9}
              >
                Cargar Documento
              </Button>
            </Flex>
            <Select
              placeholder="Selecciona un cuatrimestre"
              name="cuatrimestre"
              mb={4}
              bg="white"
              onChange={(e) => setTempMonto({ ...tempMonto, cuatrimestre: e.target.value })}
            >
              <option value="1C">1er Cuatrimestre</option>
              <option value="2C">2do Cuatrimestre</option>
            </Select>
            
            <Text fontWeight="bold" mb={4}>Montos</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
             <DateSelect
                label="Fecha 1er Vencimiento"
                name="fecha_vencimiento_1"
                value={tempMonto.fecha_vencimiento_1}
                onChange={handleChange}
              />
              <DateSelect
                label="Fecha 2do Vencimiento"
                name="fecha_vencimiento_2"
                value={tempMonto.fecha_vencimiento_2}
                onChange={handleChange}
              />
              <DateSelect
                label="Fecha 3er Vencimiento"
                name="fecha_vencimiento_3"
                value={tempMonto.fecha_vencimiento_3}
                onChange={handleChange}
              />

            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="blue" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
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

