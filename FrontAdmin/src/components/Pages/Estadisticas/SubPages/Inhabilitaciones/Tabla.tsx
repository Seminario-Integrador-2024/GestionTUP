import React, { useState } from 'react';
import { Table, Tr, Th,Thead, Tbody, Td, Checkbox } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
  request: boolean;
}

const Tabla: React.FC<TablaProps> = ({ headers, data, request }) => {
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const keyMap: { [key: string]: string } = {
    'Apellido y Nombre': 'full_name',
    'DNI': 'user',
    'Legajo': 'legajo',
  };

  const handleCheckboxChange = (dni: string) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [dni]: !prevSelectedRows[dni],
    }));
  };

  const handleHeaderCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newSelectedRows = data.reduce((acc, row) => {
      acc[row.user] = isChecked;
      return acc;
    }, {} as { [key: string]: boolean });
    setSelectedRows(newSelectedRows);
  };

  const allRowsSelected = data.length > 0 && Object.keys(selectedRows).length === data.length && Object.values(selectedRows).every(Boolean);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
          <Checkbox
              isChecked={allRowsSelected}
              onChange={handleHeaderCheckboxChange}
              borderColor={'black'}
            />
          </Th>
          {headers.map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <Tr key={row.user}>
            <Td>
              <Checkbox
                borderColor={'black'}
                isChecked={!!selectedRows[row.user]}
                onChange={() => handleCheckboxChange(row.user)}
              />
            </Td>
            {headers.map((header) => (
              <Td key={header}>{row[keyMap[header]]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Tabla;