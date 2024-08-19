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
} from '@chakra-ui/react';
import compPago from '../../icons/compromiso_de_pago_2023.pdf';
import Dropzone from './DropZone';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal: string;
}

//funcion que dependiendo lo que devuelva el endpoint /compromisos/ verifique la fecha de carga del ultimo
//si la fecha esta entre enero y junio, que devuelva 1C, sino 2C y con eso autocompletar el campo select cuatrimestre
//Usar esto para que el mensaje de alerta en rojo: El ultimo compromiso de pago fue cargado el xx/xx/xxxx

//<Heading onClick={onOpen}></Heading>
const ModalCargarDocumento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleModal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titleModal}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="30px">
          <Text mb="20px">¿A que cuatrimestre corresponde el archivo?</Text>
          <Select
            placeholder="Selecciona un cuatrimestre"
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
