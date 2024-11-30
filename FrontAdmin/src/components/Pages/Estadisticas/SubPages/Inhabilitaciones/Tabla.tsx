import React, { useEffect, useState } from 'react';
import { Table, Tr, Th,Thead, Tbody, Td, Checkbox } from '@chakra-ui/react';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const Tabla: React.FC<TablaProps> = ({ headers, data}) => {
  const [renderKey, setRenderKey] = useState(0);

  const keyMap: { [key: string]: string } = {
    'Apellido y Nombre': 'full_name',
    'DNI': 'user',
    'Legajo': 'legajo',
    'Desde': 'fecha_inhabilitacion'
  };

  return (
    <Table key={renderKey} variant="simple">
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th fontFamily="Helvetica" fontWeight="900" key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
      {data.map((row) => (
          <Tr key={row.user}>
            {headers.map((header) => (
              <Td key={header}>
                {header === 'Desde' 
                  ? row[keyMap[header]] 
                    ? new Date(row[keyMap[header]]).toLocaleDateString() 
                    : 'N/A'
                  : row[keyMap[header]]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Tabla;