import { Grid, Text, Stack } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';
import TablaMaterias from '../Configuracion/Materias/TablaMaterias';

function Sysacad() {
  return (
    <Stack direction="column" spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">Materias TUP</Text>
        <TablaMaterias/>
    </Stack>
  );
}

export default Sysacad;
