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
import { IoEyeOutline,  } from "react-icons/io5";
import {AttachmentIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';
import { FetchResumenPagos } from '../../../../API-Alumnos/Pagos.ts';
import { FetchGetCuotas } from '../../../../API-Alumnos/Pagos.ts';
import { FetchCompromisosAlumno, FetchCompromisos } from '../../../../API-Alumnos/Compromiso.ts';
import { inhabilitacionesA } from '../../../../API-Alumnos/InhabilitacionesAlumno.ts';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatoFechaISOaDDMMAAAA } from '../../../../utils/general';
import Cookies from 'js-cookie';
import { FetchDetalleCompromiso } from '../../../../API-Alumnos/Compromiso.ts';

interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado_academico: string;
  estado_financiero: string;
  ultimo_cursado: string;
  cuil: string;
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


interface Cuota {
  id_cuota: number,
  nro_cuota: number;
  fecha_informado: string,
  numero: number,
  montoActual: number;
  fechaVencimiento: string;
  valorpagado: number;
  estado: number; //whats this?
  tipo: string;
  valorinformado: number;
  monto: number;
  fecha_vencimiento: string,
  cuota_completa: boolean,
}


interface Pago {
  monto_informado: number;
  estado: string;
  fecha: string;
  cuotas: Cuota[];
  comentario: string;
}

interface PagosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pago[]; // Esta es la propiedad que contiene los pagos
}

interface Compromiso { 
  id_compromiso_de_pago: number,
  compromiso_de_pago: string,
  fecha_firmado: string,
  firmado: boolean,
  alumno: number,
  firmo_ultimo_compromiso: boolean,
}

interface CompromisoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Compromiso[];
  monto_completo: number;
  monto_completo_2venc: number, 
  monto_completo_3venc: number,
  cuota_reducida: number, 
  cuota_reducida_2venc: number,
  cuota_reducida_3venc: number,
  matricula: number,
  fecha_vencimiento_2: number,
  fecha_vencimiento_1: number,
  fecha_vencimiento_3: number,
}

function FichaAlumno() {
  const { dni } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
  const [materias, setMaterias] = useState<Materia[]>([]); // Define el estado con un valor inicial de null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [deuda, setDeuda] = useState<number>(0);
  const [detail, showDetail] = useState<number | null>(null);
  const [idCuotaSeleccionada, setIdCuotaSeleccionada] = useState<number | null>(null);
  const [cuotaCompleta, setCuotaCompleta] = useState()
  const [limit] = useState(5);
  const [offset, setOffset1] = useState(0);
  const [totalCuotas, setTotalCuotas] = useState<number>(0);
  const [pagos, setPagos] = useState<PagosResponse | null>(null);
  const [detalleCompromiso, setDetalleCompromiso] = useState<CompromisoResponse >(); 
  const [compromisoFirmado, setCompromiso] = useState<CompromisoResponse >(); // Defi
 
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
          const dniNumber = parseInt(dni, 10); // Convierte a número
          const data = await FetchEstadoCuenta(dniNumber);
          const dataDetalle = await FetchDetalleAlumno(dniNumber);
          const dataMaterias = await FetchMateriasAlumno(dniNumber);
          setAlumno(dataDetalle);
          setMaterias(dataMaterias);
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
    fetchDetalleAlumno(dni);
    fetchEstadoCuentaAlumno();
    fetchCompromiso();
    fetchImpagas();
    fetchPagos();
  }, []); 
    

    const fetchPagos = async () => {
      try {
        if (!dni) return
        const dniNumber = parseInt(dni, 10); // Convierte a número
        const data = await FetchResumenPagos(dniNumber);
        setPagos(data);
      } catch (error) {
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompromiso  = async () => {
      try {
        const data = await FetchCompromisos(parseInt(dni!, 10));
        setCompromiso(data)
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchImpagas = async () => {
      try {
        if (dni) {
          const dniNumber = parseInt(dni, 10);
          const data = await FetchGetCuotas(dniNumber); //, limit, offset agregar para hacer paginacion cuando este el endpoint
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

    useEffect(() => {
      if (idCuotaSeleccionada !== null && compromisoFirmado) {
        const fetchDetalleCompromiso = async () => {
          try {
            const detalleData = await FetchDetalleCompromiso(compromisoFirmado.results[0].id_compromiso_de_pago);
            setDetalleCompromiso(detalleData);
          } catch (error) {
            console.error('Error al obtener el detalle del compromiso', error);
          }
        };
  
        fetchDetalleCompromiso();
      }
    }, [idCuotaSeleccionada, compromisoFirmado]);

  const handleDetailPay = (cuota: any) => {
    showDetail(cuota.id_cuota)
    setIdCuotaSeleccionada(cuota.id_cuota);
    setCuotaCompleta(cuota.cuota_completa)
  };

  const handleNextPage = () => {
    if (offset + limit < totalCuotas) {
      setOffset1(offset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset1(offset - limit);
    }
  };

  const verificarFechaDePago = (fechaDeInforme: string, cuota_fechaVencimiento: string) => {
    const [year, month, day] = fechaDeInforme.split('-');
    let DatefechaDeInforme = new Date(year + '-' + month + '-' + day);

    //armar la fecha de vencimiento mes a mes 
    const [year_vto, month_vto, day_vto] = cuota_fechaVencimiento.split('-');
    let fechaCompleta_vto_1 = new Date( year_vto + '-' + month_vto + '-' + detalleCompromiso?.fecha_vencimiento_1)
    let fechaCompleta_vto_2 = new Date( year_vto + '-' + month_vto + '-' + detalleCompromiso?.fecha_vencimiento_2);

    if (DatefechaDeInforme > fechaCompleta_vto_2) {
      return  2
    } else if (DatefechaDeInforme > fechaCompleta_vto_1) {
      return  1
    } else {
      return  0
    }
  };

  const calcularMontoConMora = (
    fechaDeInforme: string,
    cuota_completa: boolean,
    cuota_fechaVencimiento: string
  ) => {
    if (!detalleCompromiso) return 0;
    const mora = verificarFechaDePago(fechaDeInforme, cuota_fechaVencimiento);
    
    switch (mora) {
      case 0:
        //pagado antes del primer vto
        return cuota_completa ? detalleCompromiso.monto_completo : detalleCompromiso.cuota_reducida;
      case 1:
        //pagado antes del segundo vto
        return cuota_completa ? detalleCompromiso.monto_completo_2venc : detalleCompromiso.cuota_reducida_2venc;
      case 2:
        //pagado despues del segundo vto
        return cuota_completa ? detalleCompromiso.monto_completo_3venc : detalleCompromiso.cuota_reducida_3venc;
      default:
        return 0;
    }
  };
  

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
          CUIL:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.cuil}
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
          {compromisoFirmado && compromisoFirmado.results[0]?.firmo_ultimo_compromiso ? 'Firmado' : 'Pendiente de firma'}
        </Text>
        <Text color="gray" mt="10px">
          Condición Sysacad:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.estado_academico}
        </Text>
        <Text color="gray" mt="20px">
          Ultimo Periodo Cursado
        </Text>
        {<Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.ultimo_cursado}
        </Text>}

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
                  <Box w={"100%"} display={"flex"} justifyContent={"center"}  >
                    {cuotas.length > 0 ? (
                      <Table variant="simple" width="90%" borderColor={"gray.200"}
                        borderStyle={"solid"}
                        borderWidth={1}
                        p={5}
                      >
                        <Thead>
                          <Tr mt={6}>
                            <Th textAlign="center" >
                              Numero
                            </Th>
                            <Th textAlign="center">Fecha Proximo Vto.</Th>
                            <Th textAlign="center">Valor Actual</Th>
                            <Th textAlign="center">Valor Pagado</Th>
                            <Th textAlign="center">Valor Informado</Th>
                            <Th textAlign="center">Valor Adeudado</Th>
                            <Th textAlign="center">Detalle</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {cuotas && cuotas.map((cuota, index) => (
                            <Tr key={index}>
                              <Td textAlign="center">{cuota.numero}</Td>
                              <Td textAlign="center">{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Td>
                              <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                              <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorpagado)}</Td>
                              <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                              <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
                              <Td textAlign="center" p="8px">{
                                cuota.valorinformado > 0 || cuota.valorpagado > 0 ?
                                  <Button bg='transparent' _hover='transparent' m="0px" p="0px" onClick={() => handleDetailPay(cuota)}><IoEyeOutline size="22px"> </IoEyeOutline> </Button>
                                  :
                                  <Button bg='transparent' _hover='transparent' disabled cursor="not-allowed" pointerEvents="none"> <IoEyeOutline color='gray' size="22px"> </IoEyeOutline> </Button>
                              }
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>


                    ) : (
                      <Text textAlign="center" padding="20px">El alumno aún no tiene cuotas generadas. </Text>
                    )}

                  </Box>
                  <Box w="90%" mt="20px" ml="70px">
                    <Flex justifyContent="space-between" >
                      <Button onClick={handlePreviousPage} isDisabled={offset === 0} _hover="none" color="white" leftIcon={<ArrowLeftIcon />}>
                        Anterior
                      </Button>
                      <Text textAlign={"center"} mb={0}>Página {Math.ceil(offset / limit) + 1} de {Math.ceil(totalCuotas / limit)}</Text>
                      <Button onClick={handleNextPage} isDisabled={offset + limit >= totalCuotas} _hover="none" color="white" rightIcon={<ArrowRightIcon />}>
                        Siguiente
                      </Button>
                    </Flex>
                  </Box>

                  {detail != null ?
                    <Box display={"flex"} justifyContent={"center"} flex={1} w={"100%"}>
                      <Box flexDirection={"column"} p={5}>
                        <Text mb={2} fontSize={18}>Detalle cuota</Text>
                        <Table variant="simple" width="100%" border="1px solid #cbd5e0" p={5}>
                          <Thead >
                            <Tr mt={6}>
                              <Th textAlign="center" >Cuota</Th>
                              <Th textAlign="center" >Valor Original Cuota</Th>
                              <Th textAlign="center" >Mora</Th>
                              <Th textAlign="center" >Cuota con Mora</Th>
                              <Th textAlign="center" >Fecha de Informe</Th>
                              <Th textAlign="center" >Valor Pagado</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {pagos && pagos.results.length > 0 ? pagos.results
                              .filter(pago =>
                                pago.cuotas.length > 0 &&
                                pago.cuotas.some(cuota => cuota.id_cuota === detail) // Verifica si alguna cuota cumple la condición
                              )
                              .map((pago, index) => (
                                <Tr key={index}>
                                  {pago.cuotas.map(cuota => (
                                    cuota.id_cuota === detail ? ( // Verifica cada cuota para mostrar solo las que coinciden
                                      <>
                                        <Td textAlign="center">{cuota.nro_cuota}</Td>
                                        <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.tipo === "Matrícula" ? (detalleCompromiso?.matricula ?? 0) : (cuotaCompleta ? (detalleCompromiso?.monto_completo) ?? 0 : (detalleCompromiso?.cuota_reducida) ?? 0))}</Td>
                                        <Td textAlign="center">
                                          {'$ ' + new Intl.NumberFormat('es-ES').format(cuota.tipo === "Matrícula" ? 0 : (calcularMontoConMora(pago.fecha, cuota.cuota_completa, cuota.fecha_vencimiento) ?? 0) - (cuota.cuota_completa ? (detalleCompromiso?.monto_completo) ?? 0 : (detalleCompromiso?.cuota_reducida) ?? 0))}
                                        </Td>
                                        <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.monto)}</Td>
                                        <Td textAlign="center">{formatoFechaISOaDDMMAAAA(pago.fecha)}</Td>
                                        <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(pago.monto_informado > cuota.monto ? cuota.monto : pago.monto_informado)}</Td>
                                      </>
                                    ) : null
                                  ))}
                                </Tr>
                              )) : 'No existen cuotas para el alumno'}
                          </Tbody>
                        </Table>
                      </Box>
                    </Box>

                    : (
                     <Box></Box>
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
                          <Th textAlign="center">Motivo</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {inhabilitaciones.map((inhabilitacion, index) => (
                          <Tr key={index}>
                            <Td textAlign="center">{new Date(inhabilitacion.fecha_desde).toLocaleDateString()}</Td>
                            <Td textAlign="center">{inhabilitacion.fecha_hasta === null ? ' - ' : new Date(inhabilitacion.fecha_hasta).toLocaleDateString()}</Td>
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
/* 
{
  cuotas.length > 1 ? (
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
    </Table> */