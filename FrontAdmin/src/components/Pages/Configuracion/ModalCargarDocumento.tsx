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
  Heading,
} from '@chakra-ui/react';
import compPago from '../../icons/compromiso_de_pago_2023.pdf';
import Dropzone from './DropZone';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal: string;
}

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
          <Select
            placeholder="Selecciona un cuatrimestre"
            name="cuatrimestre"
            mb="20px"
          >
            <option value="1C">1C</option>
            <option value="2C">2C</option>
          </Select>
          <Select placeholder="Selecciona un año" name="anio" mb="20px">
            {Array.from({ length: 5 }, (_, index) => {
              const year = new Date().getFullYear() - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </Select>
          <Dropzone />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ModalCargarDocumento;
