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
                    {typeof row[header] === 'string' || typeof row[header] === 'number' ? (
                      row[header]
                    ) : (
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '5px 10px', 
                        backgroundColor: row[header].status === 'Habilitado' ? 'green' : 'yellow', 
                        color: 'black', 
                        borderRadius: '5px' 
                      }}>
                        {row[header].status}
                      </span>
                    )}
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
