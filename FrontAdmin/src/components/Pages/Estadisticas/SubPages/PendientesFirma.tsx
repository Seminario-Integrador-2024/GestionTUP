import {Box, Flex, Alert, AlertIcon} from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchNoFirmantes } from '../../../../API/AlumnosCompromisoPago';
import { obtenerFechaDeHoy } from '../../../../utils/general';

const PendientesFirma = () => {
    const fechaHoy = obtenerFechaDeHoy();
    const anio = fechaHoy.split('/')[2];
    const cuatrimestre =  parseInt(fechaHoy.split('/')[1]) <= 7 ? '1C' : '2C';

    return (
        <Box>
            <Alert status='warning' m={4}> <AlertIcon /> Alumnos que cursan una matería del cuatrimestre actual y no firmaron el compromiso de pago</Alert>
            <TablaAlumnos 
                fetchFunction={() => FetchNoFirmantes(cuatrimestre, parseInt(anio))} //Aca tengo que cambiar al nuevo endpoint que devuelve solo los que cursan materia y no firmaron el compromiso de pago 
                title="Alumnos que no firmaron compromiso actual" 
              />
        </Box>
    );
}

export default PendientesFirma;