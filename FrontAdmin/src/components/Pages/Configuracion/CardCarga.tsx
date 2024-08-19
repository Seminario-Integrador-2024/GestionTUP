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
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import ModalVerDocumento from './ModalVerDocumento';
import ModalCargarDocumento from './ModalCargarDocumento';
import { useState } from 'react';
import CompPago from '../../icons/compromiso_de_pago_2023.pdf';
import Sysacad from '../../icons/alcances.pdf';

interface CardCargaProps {
  texto: string;
}
//usar varible del endpoint
let fechaUltimoPago = '28/07/2024 14:25';

export default function CardCarga({ texto }: CardCargaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<string | null>(null);

  const handleMenuClick = (type: string) => {
    setModalType(type);
    onOpen();
  };
  return (
    <Box
      bg="secundaryBg"
      borderRadius="10px"
      w="50%"
      p="15px"
      minHeight={5}
      boxShadow="md"
    >
      <Stack
        direction="column"
        spacing={2}
        align="left"
        marginLeft="10px"
        mb="10px"
        mt="10px"
      >
        <Heading fontSize="23px" fontWeight="bold">
          {texto}
        </Heading>

        <Text color="red" p="6px">
          El último archivo fue cargado por última vez el {fechaUltimoPago}
        </Text>
        <Flex justify="flex-end" gap="4" pt={{ base: '30px', md: '0' }}>
          <Button
            onClick={() => handleMenuClick('visualizarArchivo')}
            color="white"
            size="sm"
          >
            {' '}
            Ver último archivo{' '}
          </Button>
          <Button
            onClick={() => handleMenuClick('cargarArchivo')}
            color="white"
            size="sm"
          >
            {' '}
            Cargar archivo
          </Button>
        </Flex>

        {modalType === 'visualizarArchivo' &&
          texto === 'Compromiso de Pago' && (
            <ModalVerDocumento
              isOpen={isOpen}
              onClose={onClose}
              titleModal={texto}
              pdfUrl={CompPago}
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
