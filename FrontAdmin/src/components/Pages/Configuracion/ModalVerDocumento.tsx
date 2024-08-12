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

  import compPago from "../../icons/Compromiso de pago.png"

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    titleModal: string;
  }
  
//<Heading onClick={onOpen}></Heading>
const ModalVerDocumento: React.FC<ModalProps> = ({ isOpen, onClose, titleModal, }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{titleModal}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb="30px">
              <Image src={compPago}></Image>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
  }

export default ModalVerDocumento
