import React from "react";
import { Flex, Button, Text, Stack, Card, CardBody, Box,Tabs,TabList,  TabPanels, TabPanel, Table, Tag,Thead,Tr, Th, Tbody, Tab,Td } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import {AttachmentIcon} from '@chakra-ui/icons';
import {obtenerFechaDeHoy} from '../../../utils/general';
import {FetchDetalleAlumno} from '../../../API/DetalleAlumno'
import {FetchCompromisos} from '../../../API-Alumnos/Compromiso'
import Cookies from 'js-cookie';

interface Cuota {
    id: number;
    numero: string;
    monto1erVencimiento: number;
    monto2doVencimiento: number;
    monto3erVencimiento: number;
    valortotal: number;
    valorpagado: number;
    valoradeudado: number;
    estado: string;
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

function InformarPago() {
  
  
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [compromiso, setCompromiso] = useState<Compromiso[]>([]); // Define el estado con un valor inicial de null
  const [cuotas, setCuotas] = useState<Cuota[]>([]); //arranca vacio
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
        setCompromiso(data);
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
          {compromiso && compromiso[0]?.firmo_ultimo_compromiso ? 'Firmado' : 'Pendiente de firma'}
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
      
      <Tabs>
              <TabList>
                <Tab>Estado de cuenta</Tab>
              </TabList>

              <TabPanels>
                <TabPanel minW="50vw">
                      <Tag m="20px" p="10px">
                    Estado de cuenta al {fechaDeHoy} 
                  </Tag>
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
                            <Td textAlign="center">{}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorpagado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                            <Td textAlign="center">{'$ ' + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
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

    </Flex>
    );
}

export default InformarPago;

/*
      <Tabs>
              <TabList>
                <Tab>Estado de cuenta</Tab>
                <Tab>Materias que cursa</Tab>
              </TabList>

              <TabPanels>
                <TabPanel minW="50vw">
                      <Tag m="20px" p="10px">
                    Estado de cuenta al {fechaDeHoy} 
                  </Tag>
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
                    <Text  textAlign="center" padding="20px">No existen cuotas del cuatrimestre en curso. El alumno no firmo el compromiso de pago del periodo actual.</Text>
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
              </TabPanels>
      </Tabs>
*/