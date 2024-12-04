import { Stack, Text, Button, Flex, Box, TableContainer, Table, Thead, Th, Tbody, Tr, Td, IconButton, Alert, AlertIcon } from '@chakra-ui/react';
import ZonaCarga from './ZonaCarga';
import { useState, useEffect } from 'react';
import Resultado from './Resultado';
import Cookies from 'js-cookie';
import { FetchHistorialExcel } from '../../../../API/Sysacad';
import { formatoFechaISOaDDMMAAAA } from '../../../../utils/general';
import { DownloadIcon } from '@chakra-ui/icons';

function CargaExcel() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [reset, setReset] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileAux, setFileAux] = useState<File | null>(null);
    const [data, setData] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [excels, setExcels] = useState<any[]>([]);
    const [bandera, setBandera] = useState(false);

    const handleFileUpload = (fileName: string) => {
        setFileUploaded(true);
    };

    const handleFile = async (file: File) => {
        const formData = new FormData();
        formData.append('excel', file);

        try {
            setIsLoading(true);
            const token = Cookies.get('tokennn');
            const response = await fetch(
                `http://localhost:8000/api/excels/sysacad/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                const result = await response.json();
                setData(result);
                setFileUploaded(true);
            } else {
                const errorResponse = await response.json();
                throw new Error(JSON.stringify(errorResponse));
            }
        } catch (error: any) {
            console.error('Error al subir el archivo:', error);
        } finally {
            setBandera(!bandera);
            setIsLoading(false);
        }
    };

    const handleUploadClick = () => {
        if (file) {
            handleFile(file);
        }
    };

    const handleReset = () => {
        setFileUploaded(false);
        setFile(null);
        setData([]);
        setFileAux(null);
    };

    useEffect(() => {
        const getHistorial = async () => {
            try {
                const historial = await FetchHistorialExcel();
                historial.sort((a: any, b: any) => b.id - a.id); // Ordenar en forma descendente por id
                setExcels(historial);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getHistorial();
    }, [bandera]);

    const extractDateFromUrl = (url: string) => {
        const regex = /(\d{4}_\d{2}_\d{2}_\d{2})/;
        const match = url.match(regex);
        if (match) {
            const [year, month, day, hour] = match[0].split('_');
            return `${year}-${month}-${day} ${hour}:00`;
        }
        return 'Fecha desconocida';
    };

    return (
        <Stack direction="column" align="center">
            <Stack direction="column" spacing={4} align="center" bg="secundaryBg" padding={5} borderRadius={10} w={550}>
                <Text fontSize="xl">Procesar Excel de Sysacad</Text>
                <ZonaCarga
                    onFileUpload={handleFileUpload}
                    reset={reset}
                    cargar={fileUploaded}
                    setFile={setFile}
                    fileAux={fileAux}
                    setFileAux={setFileAux}
                />
                <Stack direction="row" padding={2} gap={4}>
                    <Button onClick={handleUploadClick} color="white" isDisabled={!fileUploaded} _hover={{ bg: "secundaryHover" }}>
                        {isLoading ? 'Procesando...' : 'Cargar'}
                    </Button>
                    <Button onClick={handleReset} variant="light">Volver a Intentar</Button>
                </Stack>
            </Stack>
            {isLoading && 
                    
                    <Button  
                        isLoading
                        loadingText='Este proceso puede tardar unos minutos.' 
                        background={'#FFD700'}
                        _hover={{ bg: "#FFD700" }}
                        color={"#000000!important"}
                    >
                         
                    </Button>
                       
            }
            <Stack>
                <Resultado data={data} />
            </Stack>

            { excels.length > 0 ?
            <Flex mb={5} mt={10} justifyContent={"center"} alignItems={"center"} w={"150%"} direction={"column"}>
                <Flex justifyContent={"flex-start"} w={"100%"}>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>Historial de archivos cargados</Text>
                </Flex>
                <Box flex={1} w={"100%"}>
                    <TableContainer
                        border="2px"
                        borderColor="#BABABA"
                        borderRadius="md"
                        width="100%"
                        height="100%"
                    >
                        <Table variant="unstyled" size="sm">
                            <Thead>
                                <Tr borderBottom="1px" borderColor="#BABABA" p={5}>
                                    <Th textAlign="center" fontWeight="bold" borderBottom="1px" borderColor="#BABABA">Numero</Th>
                                    <Th textAlign="center" fontWeight="bold" borderBottom="1px" borderColor="#BABABA">Cargado el</Th>
                                    <Th textAlign="center" fontWeight="bold" borderBottom="1px" borderColor="#BABABA" w={"10%"}>Descargar</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {excels.map((excel: any, index) => (
                                    <Tr borderColor="#BABABA" key={index}>
                                        <Td textAlign="center">{excel.id}</Td>
                                        <Td textAlign="center">{extractDateFromUrl(excel.excel)}</Td>
                                        <Td textAlign="center">
                                            <IconButton
                                                colorScheme="blue"
                                                aria-label="Descargar"
                                                icon={<DownloadIcon />}
                                                onClick={() => window.open(`${excel.excel}`, '_blank')}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
            : null }
        </Stack>
    );
}

export default CargaExcel;