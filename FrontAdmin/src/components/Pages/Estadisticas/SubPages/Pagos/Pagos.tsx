import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import {GetPagos} from "../../../../../API/Pagos";
import { useState } from "react";
import {
    Button,
    IconButton,
    Box,
    Flex,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
    Spinner,
    Divider,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { IoEyeOutline } from "react-icons/io5";
import {formatoFechaISOaDDMMAAAA} from "../../../../../utils/general";

type Cuota = {
    nro_cuota: number;
    monto: number;
}

type Pago = {
    fecha: string;
    monto: number;
    cuotas: Cuota[];
  };
  
  type Alumno = {
    nombre: string;
    total: number;
    pagos: Pago[];
  };
  
  type Data = {
    total_mes: number;
    alumnos: {
      [dni: string]: Alumno;
    };
  };

export default function Pagos() {

    const { fecha_inicio, fecha_fin } = useParams<{ fecha_inicio: string, fecha_fin: string }>();
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDni, setSelectedDni] = useState<string | null>(null);
    const [expandedPagoIndex, setExpandedPagoIndex] = useState(null);

    const handleDetailsClick = (dni: string) => {
        if (selectedDni === dni) {
          setSelectedDni(null);
          return;
        }
        setSelectedDni(dni);
        setExpandedPagoIndex(null); // Reset expanded payment index when changing DNI
    };

    const handlePagoDetailsClick = (index: any) => {
        setExpandedPagoIndex(expandedPagoIndex === index ? null : index);
    };

    useEffect (() => {
    const fetchPagos = async () => {
        try {
            const datos = await GetPagos(fecha_inicio, fecha_fin);
            setData(datos);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    fetchPagos();
    }, [fecha_inicio, fecha_fin]);

    return (
        <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} flex={1}>
        <Box w={"100%"} p={4}>
        {loading === true ? <Flex justifyContent={"center"} w={"100%"}> <Spinner size="xl" /> </Flex> :
            data && (
            <>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-around"} w={"100%"} >
                <Tag bg="secundaryBg" flexDirection={"column"} w={"45%"} p={2} fontWeight="bold"  fontFamily={"serif"} > 
                    <Text fontSize={18}>Periodo:</Text>
                    <Text fontSize={30}>{`${fecha_inicio} / ${fecha_fin}`}</Text>
                </Tag>
                <Tag bg="secundaryBg" flexDirection={"column"} w={"45%"} p={2} fontWeight="bold" fontFamily={"serif"} > 
                    <Text fontSize={18}>Total Recaudado:</Text>
                    <Text fontSize={30}>{ "$ " + new Intl.NumberFormat('es-ES', { notation: "compact", compactDisplay: "short" }).format(data.total_mes)}</Text>
                </Tag>
            </Box>
            <Table variant="simple" mt={6}  borderWidth={1} borderColor={'grey.700'}>
                <Thead>
                <Tr>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Apellido y Nombre</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">DNI</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Total Pagado</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900" w={"20%"}>Ver pagos realizados</Th>
                </Tr>
                </Thead>
                <Tbody>
                {Object.keys(data.alumnos).map((dni) => (
                    <Tr key={dni}>
                    <Td textAlign="center" > {data.alumnos[dni].nombre}</Td>
                    <Td textAlign="center" >{new Intl.NumberFormat('es-ES').format(parseInt(dni))}</Td>
                    <Td textAlign="center" >{ "$ " + new Intl.NumberFormat('es-ES').format(data.alumnos[dni].total)}</Td>
                    <Td textAlign="center" >
                    <Button bg='transparent' _hover='transparent' m="0px" p="0px" onClick={() => handleDetailsClick(dni)}><IoEyeOutline size="22px"> </IoEyeOutline> </Button> 
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            {selectedDni && (
                    <Box mt={6} >
                        <Table variant="simple" borderWidth={0.5} borderColor={'grey.700'}>
                        <Thead>
                            <Tr>
                            <Th textAlign="center">Fecha Pago</Th>
                            <Th textAlign="center">Monto Confirmado</Th>
                            <Th textAlign="center" fontFamily="Helvetica" fontWeight="900" w={"20%"}>Ver Cuotas abonadas</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.alumnos[selectedDni].pagos.map((pago, index) => (
                            <React.Fragment key={index}>
                            <Tr>
                                <Td textAlign="center">{formatoFechaISOaDDMMAAAA(pago.fecha)}</Td>
                                <Td textAlign="center">{ "$ " + new Intl.NumberFormat('es-ES').format(pago.monto)}</Td>
                                <Td textAlign="center" >
                                <Button bg='transparent' _hover='transparent' m="0px" p="0px" onClick={() => handlePagoDetailsClick(index)}> <IoEyeOutline size="22px"> </IoEyeOutline> </Button> 
                                </Td>
                            </Tr>
                            {expandedPagoIndex === index && (
                            <Tr key={`cuotas-${index}`}>
                            <Td colSpan={3}>
                                <Table variant="simple"  mt={1}>
                                    <Thead>
                                        <Tr>
                                            <Th textAlign="center">Número Cuota</Th>
                                            <Th textAlign="center">Monto</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pago.cuotas.map((cuota, cuotaIndex) => (
                                            <Tr key={cuotaIndex}>
                                                <Td textAlign="center">{cuota.nro_cuota}</Td>
                                                <Td textAlign="center">{ "$ " + new Intl.NumberFormat('es-ES').format(cuota.monto)}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Divider mt={2} mb={2} h={2} />
                            </Td>
                        </Tr>
                        )}
                        </React.Fragment>
                            ))}
                        </Tbody>
                        </Table>
                    </Box>
                    )}
                </>
                )}
            </Box>
            </Flex>
        );

}