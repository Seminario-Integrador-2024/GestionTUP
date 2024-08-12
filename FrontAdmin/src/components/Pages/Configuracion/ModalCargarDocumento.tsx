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
    useDisclosure,
    Image,
    Heading
  } from '@chakra-ui/react'

  import compPago from "../../icons/compromiso_de_pago_2023.pdf"
  import Dropzone from "./DropZone"

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    titleModal: string;
  }
  
//<Heading onClick={onOpen}></Heading>
const ModalCargarDocumento: React.FC<ModalProps> = ({ isOpen, onClose, titleModal }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{titleModal}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb="30px">
              <Dropzone />
            </ModalBody>
          </ModalContent>
        </Modal>
    )
  }

export default ModalCargarDocumento
