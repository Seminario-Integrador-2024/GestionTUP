import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Stack, Flex, Text, Link } from '@chakra-ui/react';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

function Resultado({ data }: { data: any }) {

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  let excel, duplicates, message, total;

  if ('excel' in data && 'duplicates' in data && 'message' in data && 'total' in data) {
    ({ excel, duplicates, message, total } = data);
  } else {
   
    return (
      <Stack mt={3}>
        <Text fontSize="xl" fontWeight="bold">Se encontraron errores en:</Text>
        {Object.keys(data).map((key) => (
          
            <Tag colorScheme='red' fontSize="md" fontWeight="bold">Línea:  {parseInt(key, 10)}</Tag>
         
        ))}
      </Stack>
    );
  }

  return (
    <Stack mt={3}>
      <Text fontSize="xl" fontWeight="bold">Datos cargados</Text>
      <Tag colorScheme='green' fontSize="md" fontWeight="bold">Duplicados: {duplicates}</Tag>
      
      <Tag colorScheme='green' fontSize="md" fontWeight="bold">Total: {total}</Tag>
    </Stack>
  );
}

export default Resultado;