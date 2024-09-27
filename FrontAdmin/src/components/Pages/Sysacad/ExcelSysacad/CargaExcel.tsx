import { Stack, Text, Button } from '@chakra-ui/react';
import ZonaCarga from './ZonaCarga';
import { useState, useEffect } from 'react';
import Resultado from './Resultado';
import Cookies from 'js-cookie';

function CargaExcel() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [reset, setReset] = useState(false);
    const [file, setFile] = useState<File | null>(null);  
    const [fileAux, setFileAux] = useState<File | null>(null);
    const [data, setData] = useState<string[]>([]); 
    const [isLoading, setIsLoading] = useState(false);

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
                `http://localhost:8000/api/excels/`,  
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
        }finally {
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
            {isLoading && <Text>Este proceso puede tardar unos minutos...</Text>}
            <Stack>
                <Resultado data={data} />
            </Stack>
        </Stack>
    );
}

export default CargaExcel;

