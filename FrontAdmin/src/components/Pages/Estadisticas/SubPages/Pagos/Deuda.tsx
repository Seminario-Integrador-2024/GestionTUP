import { useEffect } from "react";
import { useParams } from "react-router-dom"
import {GetDeuda} from "../../../../../API/Pagos";
import { useState } from "react";
import {formatoFechaISOaDDMMAAAA} from "../../../../../utils/general";
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
    fecha_vencimiento: string;
    monto: number;
  };
  
  type Alumno = {
    nombre: string;
    total: number;
    cuotas: Pago[];
  };
  
  type Data = {
    total_mes: number;
    alumnos: {
      [dni: string]: Alumno;
    };
  };

function Deuda()  {


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
    const fetchDeuda = async () => {
        try {
            const data = await GetDeuda();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al buscar deuda: ', error);
        }
    };
    fetchDeuda();
    }, []);
    return (
        <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} flex={1}>
        <Box w={"100%"} p={4}>
        {loading === true ? <Flex justifyContent={"center"} w={"100%"}> <Spinner size="xl" /> </Flex> :
            data && (
            <>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-around"} w={"100%"} >
                <Tag bg="secundaryBg" flexDirection={"column"} w={"60%"} p={2} fontWeight="bold" fontFamily={"serif"} > 
                    <Text fontSize={18}>Total Adeudado:</Text>
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
                            <Th textAlign="center">Fecha Vencimiento</Th>
                            <Th textAlign="center">Monto Adeudado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.alumnos[selectedDni].cuotas.map((pago, index) => (
                            <Tr key={index}>
                                <Td textAlign="center">{formatoFechaISOaDDMMAAAA(pago.fecha_vencimiento)}</Td>
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

export default Deuda