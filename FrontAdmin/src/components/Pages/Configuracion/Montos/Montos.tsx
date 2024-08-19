import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
  useDisclosure,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import ModalComponent from '../../../Modal/ModalConfirmarCambios';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

//utilizar fecha ultima vez que se cargo el archivo/montos
const fechaUltimoPago = '2024 - 2C';

const Montos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const confirmarMontos = useToast();

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setTempMonto({
      ...tempMonto,
      [name]: parseInt(value.replace(/\D/g, ''), 10) || 0,
    });
  };

  const confirmar = () => {
    setMonto(tempMonto);
    console.log('Cambios guardados');
    onClose();
    confirmarMontos({
      title: 'Cambios Guardados',
      description: 'Los cambios se guardaron correctamente',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
    >
      <SimpleGrid columns={2}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Montos
        </Text>
        <Text textAlign="end" pr="20px">
          Periodo: {fechaUltimoPago}
        </Text>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={4}>
        <Flex align="center">
          <Text w="60%">Cuota Completa</Text>
          <Input
            type="text"
            name="cuotaCompleta"
            value={'$' + tempMonto.cuotaCompleta}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida</Text>
          <Input
            type="text"
            name="cuotaReducida"
            value={'$' + tempMonto.cuotaReducida}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Completa 2do Vencimiento</Text>
          <Input
            type="text"
            name="cuotaCompleta2doVencimiento"
            value={'$' + tempMonto.cuotaCompleta2doVencimiento}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida 2do Vencimiento</Text>
          <Input
            type="text"
            name="cuotaReducida2doVencimiento"
            value={'$' + tempMonto.cuotaReducida2doVencimiento}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Completa 3er Vencimiento</Text>
          <Input
            type="text"
            name="cuotaCompleta3erVencimiento"
            value={'$' + tempMonto.cuotaCompleta3erVencimiento}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida 3er Vencimiento</Text>
          <Input
            type="text"
            name="cuotaReducida3erVencimiento"
            value={'$' + tempMonto.cuotaReducida3erVencimiento}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>

        <Flex align="center">
          <Text w="60%">Matrícula</Text>
          <Input
            type="text"
            name="matricula"
            value={'$' + tempMonto.matricula}
            onChange={handleChange}
            size="sm"
            bg="white"
          />
        </Flex>
      </SimpleGrid>

      <Flex justify="flex-end" gap="4" pt={{ base: '30px', md: '0' }}>
        <Button color="white" size="sm" onClick={onOpen}>
          Guardar Cambios
        </Button>
        <Button color="white" size="sm">
          Ver Historial
        </Button>
      </Flex>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        texto={'¿Estás seguro que deseas guardar los cambios?'}
        confirmar={confirmar}
      />
    </Box>
  );
};

export default Montos;
