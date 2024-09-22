import {
  Box,
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,

} from '@chakra-ui/react';

export default function ListadoAlumnos() {
  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Legajo</Th>
              <Th>DNI</Th>
              <Th>Situación</Th>
              <Th>Ingreso</Th>
              <Th>Año</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
