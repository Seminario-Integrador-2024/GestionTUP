import React, { useState, useEffect } from 'react';
import { Flex, Box, Tag, Text, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { FetchCompromisos } from '../../../API-Alumnos/Compromiso';
import {FetchDetalleAlumno} from '../../../API/DetalleAlumno'
import Cookies from 'js-cookie';

interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado_academico: string;
  estado_financiero: string;
  ultimo_cursado: string;
}

interface Compromiso {
  id_compromiso_de_pago: number;
  compromiso_de_pago: string;
  fecha_firmado: string;
  firmado: boolean;
  alumno: number;
  firmo_ultimo_compromiso: boolean;
}

interface CompromisoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Compromiso[];
}

const DarseBaja = () => {
  const fechaDeHoy = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [compromisoFirmado, setCompromiso] = useState<CompromisoResponse | null>(null);

  const handleDarseBaja = () => {
    console.log("Solicitud de baja enviada");
  };

  const fetchCompromiso = async () => {
    try {
      const data = await FetchCompromisos();
      console.log('compromiso:', data);
      setCompromiso(data);
    } catch (error) {
      console.error('Error al obtener los datos del compromiso', error);
    }
  };

  const fetchDetalleAlumno = async (dni: any) => {
    try {
      const data = await FetchDetalleAlumno(dni);
      setAlumno(data);
    } catch (error) {
      console.error('Error al obtener los datos del alumno', error);
    }
  };

  useEffect(() => {
    const dni = Cookies.get('dni');
    fetchDetalleAlumno(dni);
    fetchCompromiso();
  }, []);

  return (
    <Flex mt="20px" flexDirection={"column"} justifyContent={"center"}>
      
      {(compromisoFirmado && compromisoFirmado.results[0]?.firmo_ultimo_compromiso) &&
      <Alert status='warning'>
      <AlertIcon />
      Si se da de baja, aún deberá abonar la cuota del mes en curso.
      </Alert>} 

      {(!compromisoFirmado || !compromisoFirmado.results[0]?.firmo_ultimo_compromiso) &&
      <Alert status='error'>
      <AlertIcon />
          Compromiso de pago no firmado
      </Alert>} 



      <Box w={"100%"} mb={3} mt={3}>
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
            {alumno?.estado_academico || '-'}
          </Text>
        </Tag>
        <Tag w={"100%"} p="10px" fontSize={16} bg={alumno?.estado_financiero === 'Habilitado' ? "#C0EBA6" : "#FF8A8A"}>
          <Text color="gray">
            Estado Financiero:
          </Text>
          <Text size="sm" pl="8px" fontWeight="semibold">
            {alumno?.estado_financiero || '-'}
          </Text>
        </Tag>
      </Box>

      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <Button
          colorScheme="red"
          onClick={handleDarseBaja}
          isDisabled={!compromisoFirmado || !compromisoFirmado.results[0]?.firmo_ultimo_compromiso}
        >
          Solicitar Baja
        </Button>
      </Box>
    </Flex>
  );
};

export default DarseBaja;