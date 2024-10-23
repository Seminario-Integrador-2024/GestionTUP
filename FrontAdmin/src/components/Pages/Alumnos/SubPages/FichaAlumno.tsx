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
  Tabs, 
  TabList, 
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import logoUser from '../../../icons/logo-user.png';
import { useNavigate } from 'react-router-dom';
import { FetchEstadoCuenta } from '../../../../API/EstadoCuentaAlumno.ts';
import {
  FetchDetalleAlumno,
  FetchMateriasAlumno,
} from '../../../../API/DetalleAlumno.ts';
import { FetchGetCuotas } from '../../../../API-Alumnos/Pagos.ts';
import { FetchCompromisosAlumno } from '../../../../API-Alumnos/Compromiso.ts';
import { inhabilitacionesA } from '../../../../API-Alumnos/InhabilitacionesAlumno.ts';
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import {formatoFechaISOaDDMMAAAA} from '../../../../utils/general';

interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado_academico: string;
  estado_financiero: string;
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
  
interface Materia {
  codigo_materia: number;
  anio_cursada: number;
  anio_plan: number;
  nombre: string;
  cuatrimestre: number;
}

function FichaAlumno() {
  const { dni } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
  const [materias, setMaterias] = useState<Materia[]>([]); // Define el estado con un valor inicial de null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [firmoCompromiso, setFirmoCompromiso] = useState<boolean>(false);
  const [deuda, setDeuda] = useState<number>(0);
  interface Inhabilitacion {
    fecha_desde: string;
    fecha_hasta: string;
    descripcion: string;
  }
  
  const [inhabilitaciones, setInhabilitaciones] = useState<Inhabilitacion[]>([]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  useEffect(() => {

    const fetchInhabilitaciones = async () => {
      try {
        const dniNumber = parseInt(dni!, 10); 
        console.log(dniNumber);
        const response = await inhabilitacionesA(dniNumber);
        setInhabilitaciones(response.results);
      } catch (error) {
        console.error('Error al obtener las inhabilitaciones:', error);
      }
    };

    if (dni !== undefined) fetchInhabilitaciones();
  }, [dni]);


  useEffect(() => {
    const fetchDetalleAlumno = async (dni: any) => {
      try {
        if (dni) {
          const dataDetalle = await FetchDetalleAlumno(dni);
          const dataMaterias = await FetchMateriasAlumno(dni);
          setAlumno(dataDetalle);
          setMaterias(dataMaterias);
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      }
    };

    const fetchEstadoCuentaAlumno = async () => {
      try {
        if (dni) {
          const dniNumber = parseInt(dni, 10); // Convierte a número
          const data = await FetchEstadoCuenta(dniNumber);
          const sortedCuotas = data.sort((a: Cuota, b: Cuota) => a.numero - b.numero);      // Si cambia el numero de cuota no olvidar cambiar aca
          setCuotas(sortedCuotas);
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompromiso = async () => {
    try {
      if (!dni) return
      const dniNumber = parseInt(dni, 10); // Convierte a número
      const firmas = await FetchCompromisosAlumno(dniNumber);
      if (firmas.results.length > 0) {
        if (firmas.results[0].firmo_ultimo_compromiso === true) {
          setFirmoCompromiso(true);
        }
      }
    } catch (error) { 
      console.error('Error al obtener los datos', error);
    }
    }

    const fetchImpagas = async () => {
      try {
        if (dni) {
          const dniNumber = parseInt(dni, 10); 
          const data = await FetchGetCuotas(dniNumber);
            if (data.length > 0) {
            const today = new Date();
            const totalDeuda = data.reduce((acc: number, cuota: Cuota) => {
              const fechaVencimiento = new Date(cuota.fechaVencimiento);
              if (fechaVencimiento < today) {
              return acc + cuota.montoActual;
              }
              return acc;
            }, 0);
            setDeuda(totalDeuda);
            }
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    if (dni) {
      fetchDetalleAlumno(dni);
      fetchEstadoCuentaAlumno();
      fetchCompromiso();
      fetchImpagas();
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
  
  return (
    
    <Flex mt="20px" width={"100%"} >
      <Button
        position="absolute"
        left="120"
        color="white"
        size="sm"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon mr="10px" /> Volver{' '}
      </Button>
      <Box borderRight="1px solid #cbd5e0" w="25%" minH="80vh" p="20px">
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
          {firmoCompromiso ? 'Firmado' : 'No firmado'}
        </Text>
        <Text color="gray" mt="10px">
          Estado:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.estado_financiero}
        </Text>
        <Text color="gray" mt="20px">
          Ultimo Periodo Cursado
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
        {`${materias[0].anio_cursada} / ${materias[0].cuatrimestre}C`}
        </Text>
        
      </Box>

      <Box w={"100%"}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          ml={5}
        >
          <Box
            borderRadius={3}
            borderColor={'gray.200'}
            borderStyle={'solid'}
            borderWidth={1}
            p={3}
            //ml="30px"
            w="100%"
          >
            <Tabs w={"100%"}>
                <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
                    <Tab
                        _selected={{
                        borderBottom: "2px solid",
                        borderColor: "blue.500",
                        color: "blue.500",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none"
                        }}
                        _focus={{ boxShadow: "none" }}
                    >
                        Estado de Cuenta
                    </Tab>
                    <Tab
                        _selected={{
                        borderBottom: "2px solid",
                        borderColor: "blue.500",
                        color: "blue.500",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none"
                        }}
                        _focus={{ boxShadow: "none" }}
                    >
                        Materias que cursa
                    </Tab>
                    <Tab
                        _selected={{
                        borderBottom: "2px solid",
                        borderColor: "blue.500",
                        color: "blue.500",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none"
                        }}
                        _focus={{ boxShadow: "none" }}
                    >
                        Inhabilitaciones
                    </Tab>
                    </TabList>

              <TabPanels>
                <TabPanel w={"100%"}>
                      <Flex justifyContent="center" w={"100%"} mt={1} gap={2} mb={2}>
                      <Tag m="1px" p="10px" w={"100%"} fontWeight={"bold"} fontSize={16}>
                          Estado de cuenta al {(new Date().toLocaleDateString())}
                      </Tag>
                      <Tag m="1px" p="10px" w="100%" fontWeight={"bold"} fontSize={16}>
                          Deuda total: {'$ ' + new Intl.NumberFormat('es-ES').format(deuda)}
                      </Tag>
                      </Flex>
                  {cuotas.length > 1 ? (
                    <Table variant="simple" width="100%">
                      <Thead>
                        <Tr mt={6}>
                          <Th textAlign="center" p={1}>
                            Numero
                          </Th>
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
                            <Td textAlign="center" p={1}>
                              {cuota.numero}
                            </Td>
                            <Td textAlign="center">{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorpagado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <Text  textAlign="center" padding="20px">No existen cuotas. El alumno no firmo el compromiso de pago del periodo actual.</Text>
                  )}
                </TabPanel>
                
                <TabPanel minW="50vw">
                      {materias.length > 0 ? (
                        <Table variant="simple" width="100%">
                          <Thead>
                            <Tr mt={6}>
                              <Th textAlign="center">Codigo de materia</Th>
                              <Th textAlign="center">Nombre</Th>
                              <Th textAlign="center">Año de cursada</Th>
                              <Th textAlign="center">Plan</Th>
                              <Th textAlign="center">Cuatrimestre</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {materias?.map((materia, index) => (
                                <Tr
                                  key={index}
                                  onClick={() =>
                                    navigate(`#`) //Aca tendriamos que ver a donde se lo redirige
                                  }
                                  cursor="pointer"
                                  _hover={{ bg: "gray.50" }}
                                >
                                    <Td textAlign="center">{materia.codigo_materia}</Td>
                                    <Td textAlign="center">{materia.nombre}</Td>
                                    <Td textAlign="center">{materia.anio_cursada}</Td>
                                    <Td textAlign="center">{materia.anio_plan}</Td>
                                    <Td textAlign="center">{materia.cuatrimestre}</Td>
                                </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Text>El alumno no se encuentra cursando materias en el cuatrimestre en curso.</Text>
                      )}
                </TabPanel>

                <TabPanel minW="50vw">
          {inhabilitaciones.length > 0 ? (
            <Table variant="simple" width="100%">
              <Thead>
                <Tr mt={6}>
                  <Th textAlign="center">Fecha Desde</Th>
                  <Th textAlign="center">Fecha Hasta</Th>
                  <Th textAlign="center">Descripción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inhabilitaciones.map((inhabilitacion, index) => (
                  <Tr key={index}>
                    <Td textAlign="center">{new Date(inhabilitacion.fecha_desde).toLocaleDateString()}</Td>
                    <Td textAlign="center">{new Date(inhabilitacion.fecha_hasta).toLocaleDateString()}</Td>
                    <Td textAlign="center">{inhabilitacion.descripcion}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>El alumno no tiene inhabilitaciones registradas.</Text>
          )}
        </TabPanel>
              </TabPanels>
            </Tabs>

          </Box>

         
        </Flex>
      </Box>
    </Flex>
  );
}

export default FichaAlumno;
