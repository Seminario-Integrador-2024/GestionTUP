import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
} from '@chakra-ui/react';
import Dropzone from './DropZone';
import { useState } from 'react';

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
  setFilePreview: any;
  filePreview: any;
  selectedFile: File | null;
  setSelectedFile: any;
}

const ModalCargarDocumento: React.FC<ModalProps> = ({ isOpen, onClose, setFilePreview, selectedFile, setSelectedFile }) => {
  const [tempFilePreview, setTempFilePreview] = useState<string | null>(null);
 

  const handleCargar = () => {
    setFilePreview(tempFilePreview);
    onClose();
  };

 

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2x1">
      <ModalOverlay />
      <ModalContent maxWidth="70vw" minH="80vh">
        <ModalCloseButton />
        <ModalHeader>Cargar Compromiso de Pago</ModalHeader>
        <ModalBody mb="30px">
          <Dropzone setFilePreview={setTempFilePreview} setSelectedFile={setSelectedFile} filePreview={tempFilePreview} />
          <Flex justifyContent="center" mt="20px">
            <Button color="white" mt="20px" size="sm" onClick={handleCargar}>
              Cargar
            </Button>
            <Button color="white" mt="20px" size="sm" ml="20px" onClick={() => {setTempFilePreview(null), setFilePreview(null)}} isActive={tempFilePreview ? false : true}>
              Volver a intentar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCargarDocumento;