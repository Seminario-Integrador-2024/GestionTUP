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
import { useNavigate } from 'react-router-dom';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const Tabla: React.FC<TablaProps> = ({ headers, data }) => {
  // Mapea headers a las propiedades correctas del objeto row
  const keyMap: { [key: string]: string } = {
    'DNI': 'user',
    'Apellido y Nombre': 'full_name',
    'Legajo': 'legajo',
    'Monto Cuota': 'cuota_monto',
    'Monto Adeudado': 'monto_restante',
    'Monto Abonado': 'monto_pagado',
  };
  const navigate = useNavigate();

  const handleRowClick = (dni: any) => {
    navigate(`/admin/alumnos/${dni}`);
  };

  return (
    <Box w={"100%"}>
      <TableContainer borderWidth={1} borderColor={'grey.700'}>
        <Table>
          <Thead >
            <Tr >
              {headers.map((header) => (
                <Th key={header} textAlign="center" fontFamily="Helvetica" fontWeight="900">{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex} onClick={() => handleRowClick(row[keyMap['DNI']])} cursor="pointer">
                {headers.map((header) => (
                <Td key={header} textAlign={header === 'Apellido y Nombre' ? "left" : "center"}>
                  {/* Usamos keyMap para obtener la propiedad correcta */}
                  {header === 'Monto Cuota' || header === 'Monto Adeudado' || header === 'Monto Abonado' ? (
                  `$${new Intl.NumberFormat('es-ES').format(row[keyMap[header]])}`
                  ) : typeof row[keyMap[header]] === 'string' ? (
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
