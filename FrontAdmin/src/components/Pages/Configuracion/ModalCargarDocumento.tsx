import {
  Box,
  Flex,
  Button,
  propNames,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Image,
  Text,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import compPago from '../../icons/compromiso_de_pago_2023.pdf';
import Dropzone from './DropZone';
import { useEffect, useState } from 'react';

interface Compromiso {
  fecha_carga_comp_pdf: string;
  cuatrimestre: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal: string;
  compromiso: Compromiso;
}

//funcion que dependiendo lo que devuelva el endpoint /compromisos/ verifique la fecha de carga del ultimo
//si la fecha esta entre enero y junio, que devuelva 1C, sino 2C y con eso autocompletar el campo select cuatrimestre
//Usar esto para que el mensaje de alerta en rojo: El ultimo compromiso de pago fue cargado el xx/xx/xxxx

//<Heading onClick={onOpen}></Heading>
const ModalCargarDocumento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleModal,
  compromiso,
}) => {
  const añoActual = new Date().getFullYear();
  const añoCompromiso = new Date(
    compromiso?.fecha_carga_comp_pdf
  ).getUTCFullYear();
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [aviso, setAviso] = useState(false);

  useEffect(() => {
    if (añoActual == añoCompromiso) {
      if (compromiso?.cuatrimestre === '1C') {
        setCuatrimestre('2C');
      } else {
        setCuatrimestre('1C');
      }
    }
  }, []);

  const handleSelect = () => {
    if (cuatrimestre == '1C') {
      setCuatrimestre('2C');
    } else {
      setCuatrimestre('1C');
    }
  };

  useEffect(() => {
    if (añoActual == añoCompromiso) {
      if (compromiso?.cuatrimestre === cuatrimestre) {
        setAviso(true);
      } else {
        setAviso(false);
      }
    }
  }, [cuatrimestre]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titleModal}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="30px">
          <Text mb="20px">¿A que cuatrimestre corresponde el archivo?</Text>
          {aviso && (
            <Alert status="warning" mb="20px">
              <AlertIcon />
              Ya existe un compromiso de pago para ese cuatrimestre.
            </Alert>
          )}
          <Select
            placeholder="Selecciona un cuatrimestre"
            value={cuatrimestre}
            onChange={handleSelect}
            name="cuatrimestre"
            mb="20px"
          >
            <option value="1C">1er Cuatrimestre</option>
            <option value="2C">2do Cuatrimestre</option>
          </Select>
          <Dropzone />
          <Flex justifyContent="center" mt="20px">
            <Button color="white" mt="20px" size="sm">
              Cargar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ModalCargarDocumento;
