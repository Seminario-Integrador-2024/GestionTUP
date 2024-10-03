import React from 'react';
import {
  Box,
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from '@chakra-ui/react';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const Tabla: React.FC<TablaProps> = ({ headers, data }) => {
  // Mapea headers a las propiedades correctas del objeto row
  const keyMap: { [key: string]: string } = {
    'Nombre': 'full_name',
    'DNI': 'user',
    'Situación': 'estado_financiero',
  };

  return (
    <Box w={"100%"}>
      <TableContainer borderWidth={1} borderColor={'grey.700'}>
        <Table variant="simple">
          <Thead>
            <Tr bg="secundary">
              {headers.map((header) => (
                <Th key={header} textAlign="center">{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
                {headers.map((header) => (
                <Td key={header} textAlign={header === 'Nombre' ? "left" : "center"}>
                    {/* Usamos keyMap para obtener la propiedad correcta */}
                    {typeof row[keyMap[header]] === 'string' ? (
                    row[keyMap[header]]
                    ) : typeof row[keyMap[header]] === 'number' ? (
                    new Intl.NumberFormat('es-ES').format(row[keyMap[header]])
                    ) : 'N/A'}
                </Td>
                ))}
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tabla;
