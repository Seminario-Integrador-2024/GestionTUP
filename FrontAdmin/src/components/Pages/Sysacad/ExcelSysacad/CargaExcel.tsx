import {Stack, Text, Button} from '@chakra-ui/react';
import ZonaCarga from './ZonaCarga';



function CargaExcel () {

    return (
        <Stack direction="column" spacing={4} align="center" bg="secundaryBg" padding={5} borderRadius={10}>
        <Text fontSize="xl" >Procesar Excel de Sysacad</Text>
        <ZonaCarga />
        <Button color="white"> Cargar Archivo </Button>
        </Stack>

    )
}

export default CargaExcel;

