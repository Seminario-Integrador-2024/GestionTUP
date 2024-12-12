import React, { useEffect, useState } from 'react';
import { Table, Tr, Th,Thead, Tbody, Td, Checkbox } from '@chakra-ui/react';
import { formatoFechaISOaDDMMAAAA } from '../../../../../utils/general';
import { useNavigate } from 'react-router-dom';
interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const TablaDetalle: React.FC<TablaProps> = ({ headers, data}) => {
  const [renderKey, setRenderKey] = useState(0);
  const navigate = useNavigate();

  const keyMap: { [key: string]: string } = {
    'Apellido y Nombre': 'full_name',
    'DNI': 'user',
    'Legajo': 'legajo',
    'Desde': 'fecha_inhabilitacion',
    'Tipo': 'tipo',
    'Fecha Vencimiento': 'fecha_vencimiento',
    'Monto': 'monto'
  };

  return (
    <Table key={renderKey} variant="simple" p={4} borderWidth={1} borderColor={'grey.500'}>
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th fontFamily="Helvetica" fontWeight="900" key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
      {data.map((row) => (
            <Tr key={row.user} cursor="pointer" _hover={{
              bg: 'gray.200', // Color de fondo cuando el cursor está sobre la fila
              cursor: 'pointer', // Cambiar el cursor para indicar que es un enlace
            }}>
            {headers.map((header) => (
              <Td key={header}>
              {header === 'Desde' 
                ? row[keyMap[header]] 
                ? new Date(row[keyMap[header]]).toLocaleDateString() 
                : 'N/A'
                : header === 'Legajo' || header === 'DNI' 
                ? new Intl.NumberFormat('es-ES').format(row[keyMap[header]])
                : header === 'Monto'
                ? `$${new Intl.NumberFormat('es-ES').format(row[keyMap[header]])}`
                : header === 'Fecha Vencimiento'
                ? formatoFechaISOaDDMMAAAA(row[keyMap[header]])
                : row[keyMap[header]]}
              </Td>
            ))}
            </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TablaDetalle;