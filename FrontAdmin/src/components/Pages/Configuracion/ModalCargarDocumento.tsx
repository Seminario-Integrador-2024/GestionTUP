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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  compromisos: Compromiso[];
  setFilePreview: any;
  filePreview: any;
}

const ModalCargarDocumento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  compromisos,
  setFilePreview,
  filePreview,
}) => {
  const añoActual = new Date().getFullYear();

  const [cuatrimestre, setCuatrimestre] = useState('');
  const [primercuatrimestre, setPrimerCuatrimestre] = useState(false);
  const [segundocuatrimestre, setSegundoCuatrimestre] = useState(false);
  const [aviso, setAviso] = useState(false);

  useEffect(() => {
    const verificarCuatrimestre = () => {
      for (let i = compromisos.length - 1; i >= 0; i--) {
        const compromiso = compromisos[i];
        const añoCompromiso = new Date(
          compromiso?.fecha_carga_comp_pdf
        ).getUTCFullYear();
        if (añoCompromiso === añoActual) {
          if (compromiso.cuatrimestre === '1C') {
            setPrimerCuatrimestre(true);
          }
          if (compromiso.cuatrimestre === '2C') {
            setSegundoCuatrimestre(true);
          }
        }

        if (primercuatrimestre && segundocuatrimestre) {
          break;
        }
      }
    };
    verificarCuatrimestre();
  }, []);

  useEffect(() => {
    if (primercuatrimestre != segundocuatrimestre) {
      if (primercuatrimestre) {
        setCuatrimestre('2C');
      } else {
        setCuatrimestre('1C');
      }
    }
  }, [primercuatrimestre, segundocuatrimestre]);


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2x1">
      <ModalOverlay />
      <ModalContent maxWidth="70vw" minH="80vh">
        <ModalCloseButton />
        <ModalHeader>Cargar Compromiso de Pago</ModalHeader>
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
            name="cuatrimestre"
            mb="20px"
          >
            <option value="1C">1er Cuatrimestre</option>
            <option value="2C">2do Cuatrimestre</option>
          </Select>
        <Dropzone setFilePreview={setFilePreview} filePreview={filePreview}/>
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
