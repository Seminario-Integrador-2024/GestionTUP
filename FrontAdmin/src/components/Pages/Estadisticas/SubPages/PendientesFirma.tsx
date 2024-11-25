import {Box, Flex, Alert, AlertIcon, Center} from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchPendientesFirma } from '../../../../API/AlumnosPendienteFirma';
import { obtenerFechaDeHoy } from '../../../../utils/general';
import { useState, useEffect } from 'react';
import { InfoIcon } from '@chakra-ui/icons';

const PendientesFirma = () => {
    const fechaHoy = obtenerFechaDeHoy();
    const anio = fechaHoy.split('/')[2];
    const cuatrimestre =  parseInt(fechaHoy.split('/')[1]) <= 7 ? '1C' : '2C';
    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    
    const fetchAndSetValues = async (setResults: any, setCount: any) => {
        try {
          const { results, count } = await FetchPendientesFirma(); // Llama al endpoint y obtiene ambos valores
          setResults(results); // Asigna los resultados a la variable de estado o callback
          setCount(count);     // Asigna el conteo a la variable de estado o callback
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };

      useEffect(() => {
        fetchAndSetValues(setResults, setCount); // Llama la función para obtener y setear los valores
      }, []);
    
    return (
        <Box>
            <Alert status='warning' m={4}> <AlertIcon /> Alumnos que cursan una matería del cuatrimestre actual y no firmaron el compromiso de pago (Total: {count}).</Alert>
{/*             <Alert status='info' alignItems={'center'} maxW={'20%'} p={'10px'} m={4}> <AlertIcon /> Total: {count} alumnos.</Alert> */}
            <TablaAlumnos
            fetchFunction={async () => {
                return results; // Retorna solo los resultados al componente
            }}
            title="Alumnos que no firmaron compromiso actual"
            />
        </Box>
    );
}

export default PendientesFirma;