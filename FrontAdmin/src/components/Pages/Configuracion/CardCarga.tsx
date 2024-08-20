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
import { formatoFechaISOaDDMMAAAA } from '../../../utils/general';
import Sysacad from '../../icons/alcances.pdf';

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

interface CardCargaProps {
  texto: string;
  compromisos: Compromiso[];
}

export default function CardCarga({ texto, compromisos }: CardCargaProps) {
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
          El último archivo fue cargado por última vez el{' '}
          {formatoFechaISOaDDMMAAAA(
            compromisos[compromisos?.length - 1]?.fecha_carga_comp_pdf
          )}
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
            compromisos={compromisos}
          />
        )}
      </Stack>
    </Box>
  );
}
