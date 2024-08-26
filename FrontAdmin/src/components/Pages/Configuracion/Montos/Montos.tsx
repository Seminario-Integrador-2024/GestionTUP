import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createCompromiso } from '../../../../API/Montos';
import ModalCargarDocumento from '../ModalCargarDocumento';

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
  compromisos: Compromiso[];
}

const MontoInput = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: { target: { name: string; value: string } }) => void;
}) => (
  <Flex align="center">
    <Text w="60%">{label}</Text>
    <Input
      type="text"
      name={name}
      value={'$' + value}
      onChange={onChange}
      size="sm"
      bg="white"
    />
  </Flex>
);

const Montos = ({ compromisos }: CardCargaProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalCargarOpen,
    onOpen: onModalCargarOpen,
    onClose: onModalCargarClose,
  } = useDisclosure();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [monto, setMonto] = useState({
    cuotaCompleta: 0,
    cuotaReducida: 0,
    cuotaCompleta2doVencimiento: 0,
    cuotaReducida2doVencimiento: 0,
    cuotaCompleta3erVencimiento: 0,
    cuotaReducida3erVencimiento: 0,
    matricula: 0,
  });

  const [tempMonto, setTempMonto] = useState(monto);

  useEffect(() => {
    if (compromisos && compromisos.length > 0) {
      const lastCompromiso = compromisos[compromisos.length - 1];
      setMonto({
        cuotaCompleta: lastCompromiso.monto_completo,
        cuotaReducida: lastCompromiso.cuota_reducida,
        cuotaCompleta2doVencimiento: lastCompromiso.monto_completo_2venc,
        cuotaReducida2doVencimiento: lastCompromiso.cuota_reducida_2venc,
        cuotaCompleta3erVencimiento: lastCompromiso.monto_completo_3venc,
        cuotaReducida3erVencimiento: lastCompromiso.cuota_reducida_3venc,
        matricula: lastCompromiso.matricula,
      });
      setTempMonto({
        cuotaCompleta: lastCompromiso.monto_completo,
        cuotaReducida: lastCompromiso.cuota_reducida,
        cuotaCompleta2doVencimiento: lastCompromiso.monto_completo_2venc,
        cuotaReducida2doVencimiento: lastCompromiso.cuota_reducida_2venc,
        cuotaCompleta3erVencimiento: lastCompromiso.monto_completo_3venc,
        cuotaReducida3erVencimiento: lastCompromiso.cuota_reducida_3venc,
        matricula: lastCompromiso.matricula,
      });
    }
  }, [compromisos]);

  async function handleSaveChanges() {
    try {
      const compromisoData = {
        archivo_pdf: filePreview,
        cuatrimestre: "1C",
        anio: new Date().toISOString(),
        monto_completo: tempMonto.cuotaCompleta,
        monto_completo_2venc: tempMonto.cuotaCompleta2doVencimiento,
        monto_completo_3venc: tempMonto.cuotaCompleta3erVencimiento,
        matricula: tempMonto.matricula,
        cuota_reducida: tempMonto.cuotaReducida,
        cuota_reducida_2venc: tempMonto.cuotaReducida2doVencimiento,
        cuota_reducida_3venc: tempMonto.cuotaReducida3erVencimiento,
        fecha_ultima_modif: new Date().toISOString()
      };
      await createCompromiso(compromisoData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempMonto({
      ...tempMonto,
      [name]: parseInt(value.replace(/\D/g, ''), 10) || 0,
    });
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} leftIcon={<AddIcon />}>
        Nuevo Cuatrimestre
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="80%">
          <ModalCloseButton />
          <ModalBody mt={5}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              bg="secundaryBg"
              p={6}
              boxShadow="md"
              maxW="100%"
              mt={4}
              position="relative"
            >
              <SimpleGrid columns={8} spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  Montos
                </Text>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={2}>
                <MontoInput
                  label="Cuota Completa"
                  name="cuotaCompleta"
                  value={tempMonto.cuotaCompleta}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida"
                  name="cuotaReducida"
                  value={tempMonto.cuotaReducida}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Completa 2do Vencimiento"
                  name="cuotaCompleta2doVencimiento"
                  value={tempMonto.cuotaCompleta2doVencimiento}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida 2do Vencimiento"
                  name="cuotaReducida2doVencimiento"
                  value={tempMonto.cuotaReducida2doVencimiento}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Completa 3er Vencimiento"
                  name="cuotaCompleta3erVencimiento"
                  value={tempMonto.cuotaCompleta3erVencimiento}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Cuota Reducida 3er Vencimiento"
                  name="cuotaReducida3erVencimiento"
                  value={tempMonto.cuotaReducida3erVencimiento}
                  onChange={handleChange}
                />
                <MontoInput
                  label="Matrícula"
                  name="matricula"
                  value={tempMonto.matricula}
                  onChange={handleChange}
                />
              </SimpleGrid>

              <Flex justify="flex-end" gap="4" pt={{ base: '30px', md: '0' }}>
                <Button color="white" size="sm" onClick={handleSaveChanges}>
                  Guardar Cambios
                </Button>
                <Button colorScheme="blue" color="white" size="sm" onClick={onModalCargarOpen}>
                  Cargar Documento
                </Button>
                <Button colorScheme="blue" color="white" size="sm" onClick={onClose}>
                  Cancelar
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalCargarDocumento isOpen={isModalCargarOpen} onClose={onModalCargarClose} compromisos={compromisos}
        setFilePreview={setFilePreview} filePreview={filePreview} />
    </>
  );
};

export default Montos;