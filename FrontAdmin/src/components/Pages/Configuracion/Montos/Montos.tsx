import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
  useDisclosure,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import VerHistorial from './ModalVerHistorial';
import { FetchMontos } from '../../../../API/Montos';
import { formatoFechaISOaDDMMAAAA } from '../../../../utils/general';
let fechaUltimoPago = "12/08/2024"

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
const MontoInput = ({
  label,
  name,
  value,
  onChange,
  isReadOnly,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: { target: { name: string; value: string } }) => void;
  isReadOnly: boolean;
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
      readOnly={isReadOnly}
      _readOnly={{
        opacity: 1,
        cursor: 'not-allowed',
        bg: 'gray.50',
        color: 'gray.700',
      }}
    />
  </Flex>
);

const Montos = ({ texto, compromisos }: CardCargaProps) => {

  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const confirmarMontos = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [monto, setMonto] = useState({
    cuotaCompleta: 25000,
    cuotaReducida: 22000,
    cuotaCompleta2doVencimiento: 29000,
    cuotaReducida2doVencimiento: 25000,
    cuotaCompleta3erVencimiento: 31000,
    cuotaReducida3erVencimiento: 28000,
    matricula: 52000,
  });

  const [tempMonto, setTempMonto] = useState(monto);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempMonto({
      ...tempMonto,
      [name]: parseInt(value.replace(/\D/g, ''), 10) || 0,
    });
  };

  const confirmar = () => {
    setMonto(tempMonto);
    console.log('Cambios guardados');
    onCloseModal1();
    confirmarMontos({
      title: 'Cambios Guardados',
      description: 'Los cambios se guardaron correctamente',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  return (
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
      <Tooltip
        label="Editar"
        placement="bottom"
        p="10px"
        bg="white"
        color="black"
        hasArrow
        borderRadius="10px"
      >
        <IconButton
          icon={<EditIcon color="black" />}
          aria-label="Editar"
          size="lg"
          position="absolute"
          top={2}
          right={2}
          onClick={() => setIsEditing(!isEditing)}
          color={isEditing ? 'green.500' : 'gray.500'}
          bgColor={isEditing ? 'green.100' : 'white'}
          _hover={{ color: 'green.600', bgColor: 'green.200' }}
        />
      </Tooltip>
      <SimpleGrid columns={8} spacing={0}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Montos
        </Text>
        <Text fontWeight="bold" mb={4} mt={2}>
          Periodo{' '}
          {compromisos && compromisos.length > 0
            ? formatoFechaISOaDDMMAAAA(
                compromisos[compromisos.length - 1]?.fecha_carga_comp_pdf
              )
            : '-'}
        </Text>
      </SimpleGrid>
      <SimpleGrid columns={2} spacing={2}>
        <MontoInput
          isReadOnly={!isEditing}
          label="Cuota Completa"
          name="cuotaCompleta"
          value={tempMonto.cuotaCompleta}
          onChange={handleChange}
        />
        <MontoInput
          isReadOnly={!isEditing}
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
          isReadOnly={!isEditing}
        />
        <MontoInput
          isReadOnly={!isEditing}
          label="Cuota Reducida 2do Vencimiento"
          name="cuotaReducida2doVencimiento"
          value={tempMonto.cuotaReducida2doVencimiento}
          onChange={handleChange}
        />
        <MontoInput
          isReadOnly={!isEditing}
          label="Cuota Completa 3er Vencimiento"
          name="cuotaCompleta3erVencimiento"
          value={tempMonto.cuotaCompleta3erVencimiento}
          onChange={handleChange}
        />
        <MontoInput
          isReadOnly={!isEditing}
          label="Cuota Reducida 3er Vencimiento"
          name="cuotaReducida3erVencimiento"
          value={tempMonto.cuotaReducida3erVencimiento}
          onChange={handleChange}
        />
        <MontoInput
          isReadOnly={!isEditing}
          label="Matrícula"
          name="matricula"
          value={tempMonto.matricula}
          onChange={handleChange}
        />
      </SimpleGrid>

      <Flex justify="flex-end" gap="4" pt={{ base: '30px', md: '0' }}>
        <Button
          color="white"
          size="sm"
          onClick={onOpenModal1}
          isDisabled={!isEditing}
          _hover={isEditing ? 'none' : 'auto'}
        >

          Guardar Cambios
        </Button>
        <Button color="white" size="sm" onClick={onOpenModal2}>
          Ver Historial
        </Button>
      </Flex>
      <ModalComponent
        isOpen={isOpenModal1}
        onClose={onCloseModal1}
        texto={'¿Estás seguro que deseas guardar los cambios?'}
        confirmar={confirmar}
      />
      <VerHistorial isOpen={isOpenModal2} onClose={onCloseModal2} />
    </Box>
  );
};

export default Montos;
