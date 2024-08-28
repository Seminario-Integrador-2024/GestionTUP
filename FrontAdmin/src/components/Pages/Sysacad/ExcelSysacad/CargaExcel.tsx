import {Stack, Text, Button} from '@chakra-ui/react';
import ZonaCarga from './ZonaCarga';
import { useState } from 'react';


function CargaExcel () {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [reset, setReset] = useState(false);

    const handleFileUpload = (fileName: string) => {
        setFileUploaded(true);
    };

    const handleReset = () => {
        setFileUploaded(false);
        setReset(true);
        console.log("reset");
    };

    return (
        <Stack direction="column" spacing={4} align="center" bg="secundaryBg" padding={5} borderRadius={10}>
        <Text fontSize="xl" >Procesar Excel de Sysacad</Text>
        <ZonaCarga onFileUpload={handleFileUpload} reset={reset}/>
        <Stack direction="row" padding={2} gap={4}>
            <Button color="white" isDisabled={!fileUploaded}>Procesar</Button>
            <Button onClick={handleReset} variant="light">Volver a Intentar</Button>
            </Stack>
        </Stack>

    )
}

export default CargaExcel;

