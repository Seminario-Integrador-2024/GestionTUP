import { Flex, Box } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import Table from '../../Table/Table';
import { esES } from '@mui/material/locale';

import { FetchAlumnos } from '../../../API/DatosAlumnosV2.ts';

const fetchData = async () => {
  const data = await FetchAlumnos();
  FetchAlumnos();
  console.log('data de alumnos', data)
};
fetchData();

export default function Alumnos() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Table />
    </ThemeProvider>
  );
}
