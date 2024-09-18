import datos from '../../../../API/Sysacad.ts';
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Stack, Flex, Text, Link } from '@chakra-ui/react';


function Resultado({ data }: { data: any }) {

  if (data.length === 0) {
    console.log("No hay datos")
    return null;
  }

  const { excel, duplicates, message, total } = data;

  return (
    <Stack mt={7}>
      <Text fontSize="xl" fontWeight="bold">Datos cargados</Text>
      <Text>Duplicados: {duplicates}</Text>
      <Text>Mensaje: {message}</Text>
      <Text>Total: {total}</Text>
    </Stack>
  );
}

export default Resultado;