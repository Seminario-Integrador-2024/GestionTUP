import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import VerHistorial from './ModalVerHistorial';

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
      _readOnly={{ opacity: 1, cursor: 'default' }}
    />
  </Flex>
);

//utilizar fecha ultima vez que se cargo el archivo/montos
const fechaUltimoPago = '2024 - 2C';

const Montos = () => {
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
      <IconButton
        icon={<EditIcon />}
        aria-label="Editar"
        size="sm"
        position="absolute"
        top={2}
        right={2}
        onClick={() => setIsEditing(!isEditing)}
        color={isEditing ? 'green.500' : 'gray.500'}
        bgColor={isEditing ? 'green.100' : 'gray.100'}
        _hover={{ color: 'green.600', bgColor: 'green.200' }}
      />
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Montos
      </Text>
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
        <Button color="white" onClick={onOpenModal1} isDisabled={!isEditing}>
          Guardar Cambios
        </Button>
        <Button color="white" onClick={onOpenModal2}>
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
