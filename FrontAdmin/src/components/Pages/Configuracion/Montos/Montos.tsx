import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';

const Montos = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="white"
      boxShadow="md"
      maxW="100%"
      m="auto"
      mt={8}
      mr={6}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Montos
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        <Flex align="center">
          <Text w="60%">Cuota Completa</Text>
          <Input type="text" value="$25,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida</Text>
          <Input type="text" value="$22,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Completa 2do Vencimiento</Text>
          <Input type="text" value="$29,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida 2do Vencimiento</Text>
          <Input type="text" value="$25,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Completa 3er Vencimiento</Text>
          <Input type="text" value="$31,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Cuota Reducida 3er Vencimiento</Text>
          <Input type="text" value="$28,000.00" size="sm" />
        </Flex>

        <Flex align="center">
          <Text w="60%">Matrícula</Text>
          <Input type="text" value="$52,000.00" size="sm" />
        </Flex>
      </SimpleGrid>

      <Flex justify="flex-end" gap='2'>
        <Button color='white'  size="sm">
          Guardar Cambios
        </Button>
        <Button color='white' size="sm">
          Ver Historial
        </Button>
      </Flex>
    </Box>
  );
};

export default Montos;

