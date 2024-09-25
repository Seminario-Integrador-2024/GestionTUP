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
} from '@chakra-ui/react';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const Tabla: React.FC<TablaProps> = ({ headers, data }) => {
  // Mapea headers a las propiedades correctas del objeto row
  const keyMap: { [key: string]: string } = {
    'Nombre': 'full_name',
    'Legajo': 'legajo',
    'DNI': 'dni',
    'Situación': 'estado',
    'Año Ingreso': 'anio_ingreso',
  };

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr bg="cyan.100">
              {headers.map((header) => (
                <Th key={header} textAlign="center">{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {headers.map((header) => (
                  <Td key={header} textAlign="center">
                    {/* Usamos keyMap para obtener la propiedad correcta */}
                    {typeof row[keyMap[header]] === 'string' || typeof row[keyMap[header]] === 'number' ? (
                      row[keyMap[header]]
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
