import { useEffect } from "react";
import { useParams } from "react-router-dom"
import GetPagos from "../../../../../API/Pagos";
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
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { IoEyeOutline } from "react-icons/io5";

type Pago = {
    fecha: string;
    monto: number;
  };
  
  type Alumno = {
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

    const { fecha } = useParams<{ fecha: string }>();
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDni, setSelectedDni] = useState<string | null>(null);

    const handleDetailsClick = (dni: string) => {
        if (selectedDni === dni) {
          setSelectedDni(null);
          return;
        }
        setSelectedDni(dni);
    };

    useEffect (() => {
    const [year, month] = fecha ? fecha.split('-') : [undefined, undefined];
    const fetchPagos = async () => {
        try {
            console.log('Buscando pagos de: ', year, month);
            const datos = await GetPagos(year, month);
            setData(datos);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    fetchPagos();
    }, [fecha]);

    return (
        <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} flex={1}>
        <Box w={"100%"} p={4}>
        {loading === true ? <Spinner /> :
            data && (
            <>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-around"} w={"100%"} >
                <Tag bg="secundaryBg" flexDirection={"column"} w={"40%"} p={2} fontWeight="bold"  fontFamily={"serif"} > 
                    <Text fontSize={18}>Periodo:</Text>
                    <Text fontSize={30}>{fecha}</Text>
                </Tag>
                <Tag bg="secundaryBg" flexDirection={"column"} w={"40%"} p={2} fontWeight="bold" fontFamily={"serif"} > 
                    <Text fontSize={18}>Total Recaudado:</Text>
                    <Text fontSize={30}>{ "$ " + new Intl.NumberFormat('es-ES', { notation: "compact", compactDisplay: "short" }).format(data.total_mes)}</Text>
                </Tag>
            </Box>
            <Table variant="simple" mt={6}  borderWidth={1} borderColor={'grey.700'}>
                <Thead>
                <Tr>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Apellido y Nombre</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">DNI</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Total</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900" w={"20%"}>Ver Detalles</Th>
                </Tr>
                </Thead>
                <Tbody>
                {Object.keys(data.alumnos).map((dni) => (
                    <Tr key={dni}>
                    <Td textAlign="center" ></Td>
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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.alumnos[selectedDni].pagos.map((pago, index) => (
                            <Tr key={index}>
                                <Td textAlign="center">{pago.fecha}</Td>
                                <Td textAlign="center">{ "$ " + new Intl.NumberFormat('es-ES').format(pago.monto)}</Td>
                            </Tr>
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