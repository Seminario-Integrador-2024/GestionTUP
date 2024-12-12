import React from "react";
import { Flex, Button, Text, Stack, Card, CardBody, Box,Tabs,TabList,  TabPanels, TabPanel, Table, Tag,Thead,Tr, Th, Tbody, Tab,Td, Tooltip, Alert, AlertIcon } from "@chakra-ui/react";
import { useDisclosure, useBreakpointValue} from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import {AttachmentIcon, ArrowLeftIcon, ArrowRightIcon, QuestionOutlineIcon} from '@chakra-ui/icons';
import { IoEyeOutline } from "react-icons/io5";
import {obtenerFechaDeHoy, formatoFechaISOaDDMMAAAA} from '../../../utils/general';
import {FetchDetalleAlumno} from '../../../API/DetalleAlumno'
import {FetchCompromisos} from '../../../API-Alumnos/Compromiso'
import {FetchDetalleCompromiso} from '../../../API-Alumnos/Compromiso'
import {FetchResumenPagos} from '../../../API-Alumnos/Pagos'
import {FetchCuotas} from '../../../API-Alumnos/Cuotas'
import Cookies from 'js-cookie';

interface Cuota {
    id_cuota: number,
    nro_cuota: number;
    fecha_informado: string,
    numero: number,
    montoActual: number;
    fechaVencimiento: string;
    monto_pagado: number;
    estado: string;
    tipo: string;
    valorinformado: number;
    monto: number;
    fecha_vencimiento: string,
    cuota_completa: boolean,
}


interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado_academico: string;
  estado_financiero: string;
  ultimo_cursado: string;
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

function InformarPago() {
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [compromisoFirmado, setCompromiso] = useState<CompromisoResponse >(); // Define el estado con un valor inicial de null
  const [idCuotaSeleccionada, setIdCuotaSeleccionada] = useState<number | null>(null);
  const [detalleCompromiso, setDetalleCompromiso] = useState<CompromisoResponse >(); 
  const [pagos, setPagos] = useState<PagosResponse | null>(null);
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
  const [totalCuotas, setTotalCuotas] = useState<number>(0);
  const [detail, showDetail] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [limit] = useState(6);
  const [offset, setOffset1] = useState(0);

  const [cuotaCompleta, setCuotaCompleta] = useState()

  // Definir el ancho de la caja de SubMenuContent según el tamaño de la pantalla
  const isMobile = useBreakpointValue({ base: true, xl: false });

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

  useEffect(() => {

    const fetchCuotas = async () => {
      try {
        const data = await FetchCuotas(limit, offset); //limit, offset
        setCuotas(data.results);
        setTotalCuotas(data.count);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuotas()

  }, [limit, offset]);



  useEffect(() => {
    const fetchDetalleAlumno = async (dni: any) => {
      try {
        const data = await FetchDetalleAlumno(dni);
        setAlumno(data);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchCompromiso  = async () => {
      try {
        const data = await FetchCompromisos(undefined);
        setCompromiso(data)
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPagos = async () => {
      try {
        const data = await FetchResumenPagos(undefined);
        console.log('pagos:', data);
        setPagos(data);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };



    const dni = Cookies.get('dni');
    fetchDetalleAlumno(dni);
    fetchCompromiso();
    fetchPagos();
  }, []); 
 
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

    
    const [fechaDeHoy, setFechaDeHoy] = React.useState(obtenerFechaDeHoy());
    const [refresh, setRefresh] = useState(false); 


    const handleRefresh = () => {
        setRefresh(!refresh); 
    };

    // Este alumnoinfo sirve para setear cuando alumno es null que me muestre algo al menos
    const alumnoInfo = alumno || {
    full_name: '-',
    dni: '-',
    legajo: '-',
    email: '-',
    telefono: '-',
    estado_financiero: '-',
    ultimo_cursado: '-'
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
  

  
    return (
            
    <Flex mt="20px" flexDirection={"column"} justifyContent={"center"}>

      <Box w={"100%"} mb={3}>
        <Tag p="10px" w={"100%"} fontSize={18} fontWeight={"semibold"} textAlign={"center"} justifyContent={"center"}>
          Estado de cuenta al {fechaDeHoy} 
        </Tag>
      </Box>

      <Box w="100%" mb={7} display="flex" gap={2} flexDirection={{ base: "column", sm: "row" }} alignItems="center" justifyContent="center" flexWrap="wrap" paddingBottom={isMobile ? '20px' : ''} borderBottom={isMobile ? '2px solid gray' : ''}>
        <Tag flex="1" p="10px" fontSize={16}>
          <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
            <Text color="gray" textAlign="center">
              Último Compromiso de Pago:
            </Text>
            <Text size="sm" fontWeight="semibold">
              {compromisoFirmado && compromisoFirmado.results[0]?.firmo_ultimo_compromiso ? 'Firmado' : 'Pendiente de firma'}
            </Text>
          </Flex>
        </Tag>
        <Tag flex="1" p="10px" fontSize={16} bg={alumno?.estado_academico === 'Habilitado' ? "#C0EBA6" : "#FF8A8A"}>
          <Flex alignItems="center" justifyContent="center" direction={{ base: "column", md: "row" }}>
            <Text color="gray">
              Condición Sysacad:
            </Text>
            <Text size="sm" fontWeight="semibold">
            {alumno?.estado_academico}
            </Text>
          </Flex>
        </Tag>
        {alumno?.estado_financiero === 'Inhabilitado' && alumno?.estado_academico === 'Inhabilitado' ? (
          <Tag flex="1" p="10px" fontSize={16} bg="#FF8A8A">
            <Text color="gray">
              Motivo:
            </Text>
            <Text size="sm" pl="8px" fontWeight="semibold">
              Deudor
            </Text>
          </Tag>
        ) : (
          <Tag flex="1" p="10px" fontSize={16}>
            <Text color="gray">
              Ultimo Periodo Cursado
            </Text>
            <Text size="sm" pl="8px" fontWeight="semibold">
              {alumnoInfo.ultimo_cursado}
            </Text>
          </Tag>
        )}
      </Box>

      { isMobile ? (//mobile
                      <Box>
                      {cuotas && cuotas.map((cuota, index) => (
                            <Box
                              key={index}
                              borderWidth="1px"
                              borderRadius="lg"
                              overflow="hidden"
                              p={4}
                              mb={4}
                              background={'blue.50'}
                            >
                                <Text textAlign={'center'} fontWeight={'600'}>Cuota Número: {cuota.numero}</Text>
                                <Text>Fecha Vto.:{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Text>
                                <Text>Monto Actual: {'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Text>
                                <Text>Monto Pagado: {'$ ' + new Intl.NumberFormat('es-ES').format(cuota.monto_pagado)}</Text>
                                <Text>Valor Informado: {'$ ' + new Intl.NumberFormat('es-ES').format( cuota.valorinformado)}</Text>
                                <Text>Valor Adeudado: {'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.monto_pagado )}</Text>
                            </Box>
                            ))}
                      </Box>
                  ) 
                  : (
      <Box  w={"100%"} display={"flex"} justifyContent={"center"}  >
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
                          <Th textAlign="center">  Valor Actual     
                            <Tooltip ml={'2px'} label="Valor dependiente del vecimiento en que se encuentra" aria-label="A tooltip">
                              <QuestionOutlineIcon boxSize={4} />
                            </Tooltip>
                          </Th>
                          <Th textAlign="center">Valor Pagado
                            <Tooltip label="Valor correspondiente a pagos confirmados por tesoreria" aria-label="A tooltip">
                              <QuestionOutlineIcon boxSize={4} />
                            </Tooltip>
                          </Th>
                          <Th textAlign="center">Valor Informado
                            <Tooltip label="Valor correspondiente a pagos sin confirmar por tesoreria" aria-label="A tooltip">
                              <QuestionOutlineIcon boxSize={4} />
                            </Tooltip>
                          </Th>
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
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.monto_pagado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.monto_pagado)}</Td>
                            <Td textAlign="center" p="8px">{
                              cuota.valorinformado > 0 || cuota.monto_pagado > 0  ? 
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
                  <Alert status="info" alignItems="center" justifyContent="center" textAlign="center" width="70%">
                    <AlertIcon  mr={1} />

                    <Text>
                      Aún no tienes cuotas generadas. Verifica la firma del compromiso de pago para generar tus cuotas.
                    </Text>
                   
                  </Alert>
                  )}
                  
              </Box>
              )}

              {cuotas.length > 0 ?
                  <Box w="90%" mt="20px" ml={isMobile? '' : "70px"}>
                      <Flex justifyContent="space-between"> 
                          <Button onClick={handlePreviousPage} isDisabled={offset === 0} _hover="none" color="white"  leftIcon={<ArrowLeftIcon/>}>
                                Anterior
                          </Button>
                          <Text  m={isMobile? '2px' : ""} textAlign={"center"} mb={0}>Página {Math.ceil(offset / limit) + 1} de {Math.ceil(totalCuotas / limit)}</Text>
                          <Button onClick={handleNextPage} isDisabled={offset + limit >= totalCuotas} _hover="none" color="white" rightIcon={<ArrowRightIcon/>}>
                              Siguiente
                          </Button>
                      </Flex>
                  </Box>
              : null }

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
                      {pagos?.results
                        .filter(pago => 
                          pago.cuotas.length > 0 && 
                          pago.cuotas.some(cuota => cuota.id_cuota === detail) // Verifica si alguna cuota cumple la condición
                        )
                        .map((pago, index) => (
                          <Tr key={index}>
                            {pago.cuotas.map  (cuota => (
                              cuota.id_cuota === detail ? ( // Verifica cada cuota para mostrar solo las que coinciden
                                <> 
                                  <Td textAlign="center">{cuota.nro_cuota}</Td>
                                  <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.tipo === "Matrícula" ? (detalleCompromiso?.matricula ?? 0) : (cuotaCompleta ? (detalleCompromiso?.monto_completo) ?? 0 : (detalleCompromiso?.cuota_reducida) ?? 0) )}</Td>
                                  <Td textAlign="center">
                                  {'$ 0 '/*  + new Intl.NumberFormat('es-ES').format(cuota.tipo === "Matrícula" ? 0 : (calcularMontoConMora(pago.fecha, cuota.cuota_completa, cuota.fecha_vencimiento) ?? 0) - (cuota.cuota_completa ? (detalleCompromiso?.monto_completo) ?? 0 : (detalleCompromiso?.cuota_reducida) ?? 0) ) */ }
                                    </Td>
                                  <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.monto)}</Td>
                                  <Td textAlign="center">{formatoFechaISOaDDMMAAAA(pago.fecha)}</Td>
                                  <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.monto)}</Td>
                                </>
                              ) : null
                            ))}
                          </Tr>
                        ))}
                    </Tbody>
                </Table>
              </Box> 
              </Box>
              : 
              <Box></Box>
              }
                
    </Flex>
    );
}

export default InformarPago;