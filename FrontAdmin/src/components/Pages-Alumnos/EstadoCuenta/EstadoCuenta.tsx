import React from "react";
import { Flex, Button, Text, Stack, Card, CardBody, Box,Tabs,TabList,  TabPanels, TabPanel, Table, Tag,Thead,Tr, Th, Tbody, Tab,Td } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import {AttachmentIcon} from '@chakra-ui/icons';
import { IoEyeOutline } from "react-icons/io5";
import {obtenerFechaDeHoy, formatoFechaISOaDDMMAAAA} from '../../../utils/general';
import {FetchDetalleAlumno} from '../../../API/DetalleAlumno'
import {FetchCompromisos} from '../../../API-Alumnos/Compromiso'
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
    valorpagado: number;
    estado: string;
    tipocuota: string;
    valorinformado: number;
    monto: number;
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
  id: number,
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
  const [compromiso, setCompromiso] = useState<CompromisoResponse >(); // Define el estado con un valor inicial de null
  const [pagos, setPagos] = useState<PagosResponse | null>(null);
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
  const [detail, showDetail] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

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
    
    const fetchCompromisos = async () => {
      try {
        const data = await FetchCompromisos();
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPagos = async () => {
      try {
        const data = await FetchResumenPagos();
        console.log('Resumen pagos', data)
        setPagos(data);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCuotas = async () => {
      try {
        const data = await FetchCuotas();
        console.log('Cuotas:', data)
        setCuotas(data);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    const dni = Cookies.get('dni');
    fetchDetalleAlumno(dni);
    fetchCompromisos();
    fetchPagos();
    fetchCuotas();
    
   
  }, []); 
 
    const [fechaDeHoy, setFechaDeHoy] = React.useState(obtenerFechaDeHoy());
    const [refresh, setRefresh] = useState(false); 
    const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<Cuota[]>([]);


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

  /*
  const encontrarPagosPorCuota = (pagos: PagosResponse | null, detail: number): Pago | undefined => {
    return pagos?.results.filter(pago =>
      pago.cuotas.some(cuota => cuota.id_cuota === detail),
    );
    
  };

  const pagosFiltrados = encontrarPagosPorCuota(pagos, detail);*/
    return (
            
    <Flex mt="20px">

      <Box borderRight="1px solid #cbd5e0" w="20%" minH="80vh" p="20px">
        <Text color="gray" mt="30px">
          Apellido y nombre
        </Text>
        <Text
          size="sm"
          pl="8px"
          fontWeight="Bold"
        >
          {alumnoInfo.full_name}
        </Text>
        <Text color="gray" mt="10px">
          Número DNI:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumnoInfo.dni}
        </Text>
        <Text color="gray" mt="10px">
          Legajo:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
        {alumnoInfo.legajo}
        </Text>
        <Text color="gray" mt="10px">
          Email:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
        {alumnoInfo.email}  
        </Text>
        <Text color="gray" mt="10px">
          Celular
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
        {alumnoInfo.telefono}
        </Text>

        <hr></hr>

        <Text color="gray" mt="20px">
          Último Compromiso de Pago:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {compromiso && compromiso.results[0]?.firmo_ultimo_compromiso ? 'Firmado' : 'Pendiente de firma'}
        </Text>
        <Text color="gray" mt="10px">
          Estado:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
         {alumno?.estado_financiero}
        </Text>
        <Text color="gray" mt="20px">
          Ultimo Periodo Cursado
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
        {alumnoInfo.ultimo_cursado}
        </Text>
      </Box>
      
      <Tabs ml="30px">
              <TabList>
                <Tab>Estado de cuenta</Tab>
              </TabList>

              <TabPanels>
                <TabPanel minW="50vw">
                      <Tag m="20px" p="10px">
                    Estado de cuenta al {fechaDeHoy} 
                  </Tag>
                  {cuotas.length > 0 ? (
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
                            <Td textAlign="center">{cuota.numero}</Td>
                            <Td textAlign="center">{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorpagado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
                            <Td textAlign="center" p="8px">{
                              cuota.estado === 'Impaga' ? 
                              <Button bg='transparent' _hover='transparent' disabled cursor="not-allowed" pointerEvents="none"> <IoEyeOutline color='gray' size="22px"> </IoEyeOutline> </Button>
                              :
                              <Button bg='transparent' _hover='transparent' m="0px" p="0px" onClick={() => showDetail(cuota.id_cuota)}><IoEyeOutline size="22px"> </IoEyeOutline> </Button> 
                              }
                              </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <Text  textAlign="center" padding="20px">No existen cuotas para el alumno.</Text>
                  )}
                </TabPanel>
              
              </TabPanels>
              {detail != null ? 
              <Box minH="80vh" p="20px">
                <Table variant="simple" width="100%"  border="1px solid #cbd5e0">
                      <Thead >
                        <Text p="20px">Detalle Pago</Text>
                        <Tr mt={6}>
                          <Th textAlign="center" p={1}>Cuota</Th>
                          <Th textAlign="center" p={1}>Capital Original</Th>
                          <Th textAlign="center" p={1}>Capital con Mora</Th>
                          <Th textAlign="center" p={1}>Fecha de Informe</Th>
                          <Th textAlign="center" p={1}>Valor Pagado</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      {pagos?.results
                        .filter(pago => pago.cuotas[0].id_cuota === detail) // Filtra los pagos que cumplen la condición
                        .map(pago => (
                          <Tr key={pago.cuotas[0].id_cuota}> {/* Asegúrate de usar una clave única para cada fila */}
                            <Td textAlign="center">{pago.cuotas[0].nro_cuota}</Td>
                            <Td textAlign="center">{pago.cuotas[0].monto}</Td>
                            <Td textAlign="center"></Td>
                            <Td textAlign="center">{formatoFechaISOaDDMMAAAA(pago.fecha)}</Td>
                            <Td textAlign="center">{pago.monto_informado}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                </Table>
              </Box> 
              : 
              <Box></Box>
              }
              
      </Tabs>
      
    </Flex>
    );
}

export default InformarPago;

/*
           <Tabs ml="30px">
              <TabList>
                <Tab>Estado de cuenta</Tab>
              </TabList>

              <TabPanels>
                <TabPanel minW="50vw">
                      <Tag m="20px" p="10px">
                    Estado de cuenta al {fechaDeHoy} 
                  </Tag>
                  {pagos.length > 1 ? (
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
                        {pagos && pagos.map((pago, index) => (
                          <Tr key={index}>
                            <Td textAlign="center" p={1}>
                              {pago.numero}
                            </Td>
                            <Td textAlign="center">{}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(pago.montoActual)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(pago.valorpagado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(pago.valorinformado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(pago.montoActual - pago.valorpagado - pago.valorinformado)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <Text  textAlign="center" padding="20px">No existen cuotas del cuatrimestre en curso. El alumno no firmo el compromiso de pago del periodo actual.</Text>
                  )}
                </TabPanel>
              
              </TabPanels>
      </Tabs>
*/