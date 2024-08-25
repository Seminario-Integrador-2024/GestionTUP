import { Flex, Box } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import Table from '../../Table/Table';
import { esES } from '@mui/material/locale';

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
