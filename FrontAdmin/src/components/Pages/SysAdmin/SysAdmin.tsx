import { Stack, Text, Button, Flex, Box, TableContainer, Table, Thead, Th, Tbody, Tr, Td, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ZonaCarga from './ZonaCarga';
import { FetchHistorialExcelSysAdmin, FetchExcelSysAdmin } from '../../../API/SysAdmin';

function Sysadmin(){
    const [fileUploaded, setFileUploaded] = useState(false);
    const [reset, setReset] = useState(false);
    const [file, setFile] = useState<File | null>(null);  
    const [fileAux, setFileAux] = useState<File | null>(null);
    const [data, setData] = useState<string[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [excels, setExcels] = useState<any[]>([]);

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
                `http://localhost:8000/api/excels/sysadmin/`,  
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
                const historial = await FetchHistorialExcelSysAdmin();
                setExcels(historial);  
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getHistorial();
    }, []);

    return (
        <Stack direction="column" align="center" mt={"20px"}>
            <Stack 
                direction="column" 
                spacing={4} 
                align="center" 
                bg="secundaryBg" 
                padding={5} 
                borderRadius={10} 
                w={["90%", "80%", "550px"]} // Se ajusta el ancho para pantallas pequeñas
            >
                <Text fontSize={["lg", "xl"]}>Subir Excel de SysAdmin</Text>
                <ZonaCarga
                    onFileUpload={handleFileUpload}
                    reset={reset}
                    cargar={fileUploaded}
                    setFile={setFile}  
                    fileAux={fileAux}
                    setFileAux={setFileAux}
                />
                <Stack direction="row" padding={2} gap={4}>
                    <Button 
                        onClick={handleUploadClick} 
                        color="white" 
                        isDisabled={!fileUploaded} 
                        _hover={{ bg: "secundaryHover" }}
                    >
                        {isLoading ? 'Subiendo...' : 'Cargar'}
                    </Button>
                    <Button onClick={handleReset} variant="light">Volver a Intentar</Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Sysadmin;
