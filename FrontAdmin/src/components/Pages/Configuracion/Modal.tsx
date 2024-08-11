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

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    titleModal: string;
  }
  
//<Heading onClick={onOpen}></Heading>
const ModalVerDocumento: React.FC<ModalProps> = ({ isOpen, onClose, titleModal }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{titleModal}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={compPago}></Image>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }

export default ModalVerDocumento
