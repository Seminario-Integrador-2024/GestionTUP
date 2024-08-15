import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import ModalVerDocumento from './ModalVerDocumento';
import ModalCargarDocumento from './ModalCargarDocumento';
import { useState } from 'react';
import CompPago from '../../icons/compromiso_de_pago_2023.pdf';
import Sysacad from '../../icons/alcances.pdf';

interface CardCargaProps {
  texto: string;
}

export default function CardCarga({ texto }: CardCargaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<string | null>(null);

  const handleMenuClick = (type: string) => {
    setModalType(type);
    onOpen();
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg="#e9eef4"
      p={6}
      boxShadow="md"
      maxW="100%"
      w="50%"
      minHeight={5}
    >
      <Stack direction="column" spacing={2} align="left">
        <Heading fontSize="23px" fontWeight="bold">
          {texto}
        </Heading>
        <Menu>
          <MenuButton as={Button} w="25%" colorScheme="" size="sm">
            Opciones
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleMenuClick('visualizarArchivo')}>
              Ver último archivo
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick('cargarArchivo')}>
              Cargar archivo
            </MenuItem>
          </MenuList>
        </Menu>

        {modalType === 'visualizarArchivo' &&
          texto === 'Compromiso de Pago' && (
            <ModalVerDocumento
              isOpen={isOpen}
              onClose={onClose}
              titleModal={texto}
              pdfUrl={CompPago}
            />
          )}

        {modalType === 'visualizarArchivo' && texto === 'Sysacad' && (
          <ModalVerDocumento
            isOpen={isOpen}
            onClose={onClose}
            titleModal={texto}
            pdfUrl={Sysacad}
          />
        )}

        {modalType === 'cargarArchivo' && (
          <ModalCargarDocumento
            isOpen={isOpen}
            onClose={onClose}
            titleModal={texto}
          />
        )}
      </Stack>
    </Box>
  );
}
