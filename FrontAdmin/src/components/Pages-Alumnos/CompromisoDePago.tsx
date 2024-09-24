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
    Link,
    TableContainer,
    Icon,
    Button
} from '@chakra-ui/react';
import { DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import { FetchCompromisos, FetchUltimoCompromiso, FirmarCompromiso } from "../../API-Alumnos/Compromiso";
import {useEffect, useState} from 'react';
import {formatoFechaISOaDDMMAAAA} from "../../utils/general";
import Cookies from 'js-cookie';

export default function CompromisoDePago() {

const [compromisos, setCompromisos] = useState([]);
const [ultimoCompromiso, setUltimoCompromiso] = useState(false);
const [ultimo, setUltimo] = useState<any>([]);
const [isLoaded, setIsLoaded] = useState(false);
const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
        const data = await FetchCompromisos();
        setCompromisos(data);
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



}, []);


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
    }
    catch (error) {
        console.log(error);
    }
};


return (

<Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
                {ultimoCompromiso && <Flex justifyContent={"center"} alignItems={"center"} direction={"column"} bg={"#DEF9C4"} p={5} borderRadius={5} mb={4} mt={4}>
                <Text color="#387F39" fontWeight="bold" fontSize="sm">
                        El compromiso de pago del periodo actual ya se encuentra firmado ({formatoFechaISOaDDMMAAAA(ultimo.fecha_firmado)}).
                </Text>
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
                    {pdfUrl && <iframe src={pdfUrl} width="1000px" height="400px" />}
                </Box>
            </Flex>

            
            <Flex justifyContent={"flex-end"}  mt={4} mb={4} flex={1} width={"100%"}>
                <Button colorScheme="teal" isDisabled={ultimoCompromiso} onClick={() => handleFirmar()}>Firmar</Button>
            </Flex>
            </Flex>

            <Flex mb={5} justifyContent={"center"} alignItems={"center"} w={"85%"} direction={"column"}>
                <Flex justifyContent={"flex-start"} w={"100%"}>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>Historial compromisos de pago Firmados</Text>
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
        </Flex>
    );
}
