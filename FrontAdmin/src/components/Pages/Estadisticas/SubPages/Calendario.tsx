import {
  Box,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Card, CardBody, Text } from '@chakra-ui/react';
import API from '../../../../API/DatosEstadistica';
import DoughnutChart from '../Chars/Donut';

function Calendario() {
  const tarjetas = API.map((v) => {
    return (
      <Card key={v.id} w="300px" minHeight="100px">
        <CardBody>
          <Flex justifyContent="center" alignItems="baseline">
            <Text fontSize="6xl">{v.value}</Text>
            <Text fontSize="6xl">/</Text>
            <Text fontSize="3xl">{v.total}</Text>
          </Flex>
        </CardBody>
        <CardFooter
          marginTop="-10%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size="xs" textTransform="uppercase" textAlign="center">
            {v.title}
          </Heading>
        </CardFooter>
      </Card>
    );
  });

  return (
    <Flex direction="column">
      <Card width="100%">
        <CardBody>
          <HStack spacing="4" justifyContent="flex-start" margin="auto">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'center', md: 'flex-start' }}
              gap="10"
            >
              <FormControl id="desde" variant="floating" maxWidth="200px">
                <Input placeholder="Desde" name="desde" type="date" />
                <FormLabel>Desde</FormLabel>
              </FormControl>
              <FormControl id="hasta" variant="floating" maxWidth="200px">
                <Input placeholder="Hasta" name="hasta" type="date" />
                <FormLabel>Hasta</FormLabel>
              </FormControl>
            </Flex>
          </HStack>
        </CardBody>
      </Card>
      <Box
        margin="10px"
        display="flex"
        justifyContent="center"
        marginTop="3rem"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          wrap="wrap"
          spacing="30px"
          justify="center"
          align="center"
          w="100%"
        >
          {tarjetas}
        </Stack>
      </Box>
      <Box
        margin="10px"
        justifyContent="center"
        marginTop="3rem"
        w="100%"
        alignContent="center"
      >
        <Flex
          w="100%"
          direction={{ base: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
        >
          <DoughnutChart
            labelsPromp={['Alumnos Habilitados', 'Alumnos Inhabilitados']}
            dataPromp={[60, 10]}
          />
          <DoughnutChart
            labelsPromp={['No solicitaron prorroga', 'Solicitudes la prorroga']}
            dataPromp={[73, 1]}
          />
          <DoughnutChart
            labelsPromp={['Alumnos Activos', 'Dados de baja']}
            dataPromp={[70, 4]}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Calendario;
