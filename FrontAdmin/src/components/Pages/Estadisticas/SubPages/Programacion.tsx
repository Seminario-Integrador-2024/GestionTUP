import React, { useState } from 'react';
import {
  Box,
  Text,
  FlexProps,
  Heading,
  Flex,
  TableContainer,
  TableCaption,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';

export default function Programacion() {
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
