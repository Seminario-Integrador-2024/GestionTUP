import { useParams } from 'react-router-dom';
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Spacer,
  useColorModeValue,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Checkbox,
  Input,
  Tag,
} from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import logoUser from '../../../icons/logo-user.png';
import { useNavigate } from 'react-router-dom';
import { FetchDetalleAlumno } from '../../../../API/DetalleAlumno.ts';
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado: string;
}

function FichaAlumno() {
  const { dni } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retrocede en el historial de navegación
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dni) {
          const dniNumber = parseInt(dni, 10); // Convierte a número
          const data = await FetchDetalleAlumno(dniNumber);
          setAlumno(data);
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    if (dni) {
      fetchData();
    }
  }, [dni]); // Incluye `dni` como dependencia

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error al cargar los datos.</Text>;
  }

  if (!alumno) {
    return <Text>No se encontraron datos.</Text>;
  }
  const cuotas = [
    {
      numero: 0,
      montoActual: 0,
      fechaVencimiento: '2024-03-10',
      valorpagado: 10000,
      valoradeudado: 0,
      estado: 'PAGADO',
    },
    {
      numero: 1,
      montoActual: 10000,
      fechaVencimiento: '2024-03-10',
      valorpagado: 5000,
      valoradeudado: 5000,
      estado: 'INFORMADO',
    },
    {
      numero: 2,
      montoActual: 10000,
      fechaVencimiento: '2024-04-10',
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 3,
      montoActual: 10000,
      fechaVencimiento: '2024-05-10',
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 4,
      montoActual: 10000,
      fechaVencimiento: '2024-06-10',
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 5,
      montoActual: 10000,
      fechaVencimiento: '2024-07-10',
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
  ];
  /*
  const [cuotas, setCuotas] = useState<any[]>([]); 
    const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<any[]>([]);

    useEffect(() => {
        setCuotas(cuotas)   
    }, [])

    useEffect(() => {
        console.log(cuotasSeleccionadas)  
    }, [cuotasSeleccionadas])
   
    // Funcion para manejar el cambio de estado de los checkbox, si el esatdo anterior es true, lo elimina del array, si es false lo agrega
    const handleCheckboxChange = (cuota:any) => {
        setCuotasSeleccionadas((prevSeleccionadas) => {
          if (prevSeleccionadas.includes(cuota)) {
            return prevSeleccionadas.filter((item) => item !== cuota);
          } else {
            return [...prevSeleccionadas, cuota];
          }
        });
      };
  */
  return (
    <Flex mt="20px">
      <Button
        position="absolute"
        left="120"
        color="white"
        size="sm"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon mr="10px" /> Volver{' '}
      </Button>
      <Box borderRight="1px solid #cbd5e0" w="20%" minH="80vh" p="20px">
        <Text color="gray" mt="30px">
          Apellido y nombre
        </Text>
        <Text
          size="sm"
          pl="8px"
          fontWeight="Bold"
        >{`${alumno.full_name}`}</Text>
        <Text color="gray" mt="10px">
          Número DNI:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.dni}
        </Text>
        <Text color="gray" mt="10px">
          Legajo:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.legajo}
        </Text>
        <Text color="gray" mt="10px">
          Email:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.email}
        </Text>
        <Text color="gray" mt="10px">
          Celular
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.telefono}
        </Text>

        <hr></hr>

        <Text color="gray" mt="20px">
          Compromiso de Pago:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          Firmado
        </Text>
        <Text color="gray" mt="10px">
          Estado:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.estado}
        </Text>
        <Text color="gray" mt="10px">
          Deuda:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          -
        </Text>
      </Box>

      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            borderRadius={8}
            borderColor={'gray.200'}
            borderStyle={'solid'}
            borderWidth={1}
            p={3}
            ml="30px"
            w="100%"
          >
            <Tag m="20px" p="10px">
              Estado de cuenta al 18/09/2024{' '}
            </Tag>
            {cuotas.length > 0 ? (
              <Table variant="simple" width="100%">
                <Thead>
                  <Tr mt={6}>
                    <Th></Th>
                    <Th textAlign="center" p={1}>
                      Numero
                    </Th>
                    <Th textAlign="center">Fecha Primer Vto.</Th>
                    <Th textAlign="center">Valor Actual</Th>
                    <Th textAlign="center">Valor Pagado</Th>
                    <Th textAlign="center">Valor Adeudado</Th>
                    <Th textAlign="center">Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cuotas.map((cuota, index) => (
                    <Tr key={index}>
                      {cuota.estado === 'PAGADO' ? (
                        <Td>
                          <Checkbox isDisabled={true}></Checkbox>
                        </Td>
                      ) : (
                        <Td>
                          <Checkbox
                            p={0}
                            borderColor="black"
                            // onChange={(e) => handleCheckboxChange(cuota)}
                          ></Checkbox>
                        </Td>
                      )}
                      <Td textAlign="center" p={1}>
                        {cuota.numero}
                      </Td>
                      <Td textAlign="center">{cuota.fechaVencimiento}</Td>
                      <Td textAlign="center">{'$ ' + cuota.montoActual}</Td>
                      <Td textAlign="center">{'$ ' + cuota.valorpagado}</Td>
                      <Td textAlign="center">{'$ ' + cuota.valoradeudado}</Td>
                      {cuota.estado === 'ADEUDADO' ? (
                        <Td textAlign="center">
                          {' '}
                          <Badge colorScheme="red" minW="85px">
                            {cuota.estado}
                          </Badge>
                        </Td>
                      ) : cuota.estado === 'INFORMADO' ? (
                        <Td textAlign="center">
                          {' '}
                          <Badge colorScheme="yellow" minW="85px">
                            {cuota.estado}
                          </Badge>
                        </Td>
                      ) : (
                        <Td textAlign="center">
                          {' '}
                          <Badge colorScheme="green" minW="85px">
                            {cuota.estado}
                          </Badge>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No hay datos disponibles</Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FichaAlumno;
