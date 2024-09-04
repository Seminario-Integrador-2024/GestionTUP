import {Stack, Text, Button, Flex} from '@chakra-ui/react';
import ZonaCarga from './ZonaCarga';
import { useState } from 'react';
import Resultado from './Resultado';

function CargaExcel () {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [reset, setReset] = useState(false);
    const [file, setFile] = useState<File>();  //para mandar como parametro al fetch
    const [data, setData] = useState<any[]>([]); //para guardar la data del fetch

    const handleFileUpload = (fileName: string) => {
        setFileUploaded(true);
    };

    const handleReset = () => {
        setFileUploaded(false);
        setReset(true);
        console.log("reset");
    };

    const handleFile = (file: File) => {
        //aca hago el fecth, esta funcion paso como parametro a ZonaCarga
        setFile(file);   //nose esto. creo que no va
        //const data = fecth
        //setData(data);
        // Pasar data a Resultado
        // Renderizar Resultado solo cuando data tiene algo

        
    // const handleFile = async (file: File) => {
    //     const result = await fetchData('URL_DEL_SERVIDOR', file);
    //     if (result.statusCode === 200) {
    //         setData(result.data);
    //         setFileUploaded(true);
    //     } else {
    //         console.error('Error en la solicitud:', result.statusCode);
    //     }
    // };
    }

    return (
        <Stack direction="column" align="center">
        <Stack direction="column" spacing={4} align="center" bg="secundaryBg" padding={5} borderRadius={10} w={550}>
        <Text fontSize="xl" >Procesar Excel de Sysacad</Text>
        <ZonaCarga onFileUpload={handleFileUpload} reset={reset}/>
        <Stack direction="row" padding={2} gap={4}>
            <Button color="white" isDisabled={!fileUploaded} _hover={{bg:"secundaryHover"}}>Cargar</Button>
            <Button onClick={handleReset} variant="light">Volver a Intentar</Button>
        </Stack>
        </Stack>
        {/* <Stack>
            { fileUploaded && <Resultado />}
        </Stack> */}
        </Stack>
    )
}

export default CargaExcel;

