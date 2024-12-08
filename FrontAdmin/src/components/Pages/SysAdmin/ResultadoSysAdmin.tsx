import { Stack, Text, Tag, Box } from '@chakra-ui/react';

function Resultado({ data }: { data: any }) {
  console.log(data);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const { excel, last_row_processed, total_processed, alumnos_rehabilitados, not_processed } = data;

  return (
    <Stack mt={3}>
      <Text fontSize="xl" fontWeight="bold">Datos cargados</Text>
      <Tag colorScheme="green" fontSize="md" fontWeight="bold">
        Total filas leidas: {total_processed}
      </Tag>
      {Object.keys(alumnos_rehabilitados).length > 0 && (
        <Stack>
          <Text fontSize="md" fontWeight="bold">Alumnos rehabilitados:</Text>
          {Object.keys(alumnos_rehabilitados).map((key) => (
            <Tag colorScheme="green" fontSize="md" fontWeight="bold" key={key}>
              {key}: {alumnos_rehabilitados[key]}
            </Tag>
          ))}
        </Stack>
      )}
      {Object.keys(not_processed).length > 0 && (
       <Stack>
       <Text fontSize="md" fontWeight="bold">Filas No procesadas:</Text>
       <Box maxHeight="200px" overflowY="auto" border="1px solid #ccc" borderRadius="md" p={2} >
         {Object.keys(not_processed).map((key) => (
           <Tag colorScheme="red" fontSize="md" fontWeight="bold" key={key}  display="block" m={1}>
             Línea: {parseInt(key, 10)}
           </Tag>
         ))}
       </Box>
     </Stack>
      )}
    </Stack>
  );
}

export default Resultado;