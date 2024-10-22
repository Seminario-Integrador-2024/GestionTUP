import { Flex, Box, Tag, Text, Button } from '@chakra-ui/react';

const DarseBaja = () => {
  const fechaDeHoy = new Date().toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    }); 
  const alumno = {
    estado: "Activo", 
    estado_financiero: "Habilitado" 
  };

  const handleDarseBaja = () => {
 
    console.log("Solicitud de baja enviada");
  };

  return (
    <Flex mt="20px" flexDirection={"column"} justifyContent={"center"}>
      <Box w={"100%"} mb={3}>
        <Tag p="10px" w={"100%"} fontSize={18} fontWeight={"semibold"} textAlign={"center"} justifyContent={"center"}>
          Solicitud de Baja al {fechaDeHoy}
        </Tag>
      </Box>

      <Box w="100%" mb={7} display={"flex"} gap={2} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
        <Tag w={"100%"} p="10px" fontSize={16}>
          <Text color="gray">
            Estado Actual:
          </Text>
          <Text size="sm" pl="8px" fontWeight="semibold">
            {alumno.estado}
          </Text>
        </Tag>
        <Tag w={"100%"} p="10px" fontSize={16} bg={alumno.estado_financiero === 'Habilitado' ? "#C0EBA6" : "#FF8A8A"}>
          <Text color="gray">
            Estado Financiero:
          </Text>
          <Text size="sm" pl="8px" fontWeight="semibold">
            {alumno.estado_financiero}
          </Text>
        </Tag>
      </Box>

      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <Button colorScheme="red" onClick={handleDarseBaja}>
          Solicitar Baja
        </Button>
      </Box>
    </Flex>
  );
};

export default DarseBaja;