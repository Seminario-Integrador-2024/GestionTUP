import React, { useEffect, useState } from 'react';
import { Table, Tr, Th,Thead, Tbody, Td, Checkbox } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { inhabilitarAlumno } from '../../../../../API/Inhabilitaciones';
import { set } from 'date-fns';

interface TablaProps {
  headers: string[];
  data: Array<Record<string, any>>;
  request: boolean;
  onInhabilitar: () => void;
  setRequest: (value: boolean) => void;
}

const Tabla: React.FC<TablaProps> = ({ headers, data, request, onInhabilitar, setRequest }) => {
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(0);

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

  useEffect(() => {
  const handleInhabilitar = async () => {
    const alumnosInhabilitar = data.filter((row) => selectedRows[row.user]);
    for (const alumno of alumnosInhabilitar) {
      await inhabilitarAlumno(alumno.legajo);
    }
        setSelectedRows({});
        setRenderKey((prevKey) => prevKey + 1); 
        onInhabilitar();
        setRequest(false);
    };
    if (request) {
        handleInhabilitar();
    }
    }, [request]);

  const allRowsSelected = data.length > 0 && Object.keys(selectedRows).length === data.length && Object.values(selectedRows).every(Boolean);

  return (
    <Table key={renderKey} variant="simple">
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