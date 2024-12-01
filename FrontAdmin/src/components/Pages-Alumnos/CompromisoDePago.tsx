import React from "react";
import {
    Container,
    Box,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Flex,
    Skeleton,
    TableContainer,
    Icon,
    Button,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import { DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import { FetchCompromisos, FetchUltimoCompromiso, FirmarCompromiso } from "../../API-Alumnos/Compromiso";
import { FetchGetCuotas } from "../../API-Alumnos/Pagos";
import {useEffect, useState} from 'react';
import {formatoFechaISOaDDMMAAAA} from "../../utils/general";
import { useToast } from "../Toast/useToast";
import Cookies from 'js-cookie';

export default function CompromisoDePago() {

const [compromisos, setCompromisos] = useState([]);
const [ultimoCompromiso, setUltimoCompromiso] = useState(false);
const [adeuda, setAdeuda] = useState(false);
const [ultimo, setUltimo] = useState<any>([]);
const [refresh, setRefresh] = useState(false);
const [pdfUrl, setPdfUrl] = useState<string | null>(null);
const showToast = useToast();

const handleViewPdf = async (url: string) => {
    try {
      const token = Cookies.get('tokennn');
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Buscando PDF en: ', url);
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error al obtener el PDF:', error);
    }
  };

useEffect(() => {
    const fetchCompromisos = async () => {
        try{
        const dni = Number(Cookies.get('dni'));
        const data = await FetchCompromisos(dni);
        setCompromisos(data.results);
        console.log(data);
        } catch (error) {
            console.log(error)
        }
    };
    fetchCompromisos();

    const fetchUltimoCompromiso = async () => {
        try {
            const data = await FetchUltimoCompromiso();
            handleViewPdf(data.archivo_pdf_url);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUltimoCompromiso();

    const fetchAdeuda = async () => {
        try {
            const dni = Number(Cookies.get('dni'));
            const data = await FetchGetCuotas(dni);
            if (data.length > 0) {
                setAdeuda(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAdeuda();

}, [refresh]);


useEffect(() => {
    if (compromisos.length > 0) {
        setUltimo(compromisos[compromisos.length - 1]);
    }
}, [compromisos]);

useEffect(() => {
    if (ultimo) {
        console.log(ultimo);
        if (ultimo.firmo_ultimo_compromiso === true) {
            setUltimoCompromiso(true);
        }
    }
}, [ultimo]);



const handleFirmar = async () => {
    try {
        await FirmarCompromiso();
        setRefresh(!refresh);
        showToast('Exito', 'Compromiso de pago firmado con exito', 'success');
    }
    catch (error) {
        console.log(error);
    }
};


return (

<Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
                {ultimoCompromiso && <Flex  alignItems={"center"} w={'85%'} direction={"column"} mb={4} mt={4}>
                <Alert status='success'>
                    <AlertIcon />
                    El compromiso de pago del periodo actual ya se encuentra firmado ({formatoFechaISOaDDMMAAAA(ultimo.fecha_firmado)}).
                </Alert>
                </Flex>
                }
                {!ultimoCompromiso && adeuda && <Flex  alignItems={"center"} w={'100%'} direction={"column"} mb={4} mt={4}>
                <Alert status='error'>
                    <AlertIcon />
                    Aun adeuda cuotas. No puede firmar el compromiso de pago.
                </Alert>
                </Flex>
                }
            <Flex direction={"column"}>
                
            <Flex justify="center">
                <Box
                    border="1px"
                    borderColor="gray.200"
                    p={4}
                    borderRadius="md"
                    w={"100%"}
                >
                    {pdfUrl ? <iframe src={pdfUrl} width="1000px" height="400px" />
                    : <Skeleton height="400px" w={"1000px"}/>}
                </Box>
            </Flex>

            
            <Flex justifyContent={"flex-end"}  mt={4} mb={4} flex={1} width={"100%"}>
                <Button colorScheme="teal" isDisabled={ultimoCompromiso || adeuda} onClick={() => handleFirmar()}>Firmar</Button>
            </Flex>
            </Flex>

            {compromisos.length > 0 ? (
            <Flex mb={5} justifyContent={"center"} alignItems={"center"} w={"85%"} direction={"column"}>
                <Flex justifyContent={"flex-start"} w={"100%"}>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>Historial compromisos de pago firmados</Text>
                </Flex>
                <Box flex={1} w={"100%"}>
                    <TableContainer
                        border="2px"
                        borderColor="#BABABA" // Borde gris claro para la tabla
                        borderRadius="md"
                        width="100%"
                        height="100%"
                    >
                        <Table variant="unstyled" size="sm">
                            <Thead>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Th textAlign="center" fontWeight="bold"  borderBottom="1px" borderColor="#BABABA">Periodo</Th>
                                    <Th textAlign="center" fontWeight="bold"  borderBottom="1px" borderColor="#BABABA">Fecha Firma</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                { compromisos.map((compromiso: any, index) => (
                                    <Tr borderBottom="1px" borderColor="#BABABA" key={index}>
                                        <Td textAlign="center" >{compromiso.compromiso_de_pago}</Td>
                                        <Td textAlign="center" >{formatoFechaISOaDDMMAAAA(compromiso.fecha_firmado)}</Td>
                                    </Tr>
                                )) }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
            ): <></>}
        </Flex>
    );
}
