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
import { FetchEstadoCuenta } from '../../../../API/EstadoCuentaAlumno.ts';
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

interface Cuota {
  numero: number;
  montoActual: number;
  fechaVencimiento: string;
  valorpagado: number;
  estado: number;
  tipocuota: string;
  valorinformado: number;
}

function FichaAlumno() {
  const { dni } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retrocede en el historial de navegación
  };

  useEffect(() => {
    const fetchDetalleAlumno = async () => {
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

    const fetchEstadoCuentaAlumno = async () => {
      try {
        if (dni) {
          const dniNumber = parseInt(dni, 10); // Convierte a número
          const data = await FetchEstadoCuenta(dniNumber);
          setCuotas(data);
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    if (dni) {
      fetchDetalleAlumno();
      fetchEstadoCuentaAlumno();
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
  /*
  const cuotas = [
    {
      numero: 0,
      montoActual: 0,
      fechaVencimiento: '2024-03-10',
      valorinformado: 10000,
      valorpagado: 10000,
      valoradeudado: 0,
      estado: 'PAGADO',
    },
    {
      numero: 1,
      montoActual: 10000,
      fechaVencimiento: '2024-03-10',
      valorinformado: 5000,
      valorpagado: 5000,
      valoradeudado: 5000,
      estado: 'INFORMADO',
    },
    {
      numero: 2,
      montoActual: 10000,
      fechaVencimiento: '2024-04-10',
      valorinformado: 0,
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 3,
      montoActual: 10000,
      fechaVencimiento: '2024-05-10',
      valorinformado: 0,
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 4,
      montoActual: 10000,
      fechaVencimiento: '2024-06-10',
      valorinformado: 0,
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
    {
      numero: 5,
      montoActual: 10000,
      fechaVencimiento: '2024-07-10',
      valorinformado: 0,
      valorpagado: 0,
      valoradeudado: 10000,
      estado: 'ADEUDADO',
    },
  ];*/
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
          {new Intl.NumberFormat().format(alumno.dni)}
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
        <Text color="gray" mt="20px">
          Ultimo Periodo Cursado
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          2024 - 1C
        </Text>
        
      </Box>

      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          ml={5}
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
              Estado de cuenta al {(new Date().toLocaleDateString())}
            </Tag>
            {cuotas.length > 1 ? (
              <Table variant="simple" width="100%">
                <Thead>
                  <Tr mt={6}>
                    
                    <Th textAlign="center">Cuota</Th>
                    <Th textAlign="center">Fecha Primer Vto.</Th>
                    <Th textAlign="center">Valor Actual</Th>
                    <Th textAlign="center">Valor Pagado</Th>
                    <Th textAlign="center">Valor Informado</Th>
                    <Th textAlign="center">Valor Adeudado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cuotas && cuotas.map((cuota, index) => (
                    <Tr key={index}>
                      
                      <Td textAlign="center">{cuota.numero}</Td>
                      <Td textAlign="center">{cuota.fechaVencimiento}</Td>
                      <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                      <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorpagado)}</Td>
                      <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                      <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text minW="50vw" textAlign="center" padding="20px">No existen cuotas del cuatrimestre en curso. Verifique que el compromiso de pago este firmado.</Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FichaAlumno;
