import React, { useState, useEffect } from 'react';
import { Flex, Box, Tag, Text, Button, Alert, AlertIcon, useDisclosure } from '@chakra-ui/react';
import { FetchCompromisos } from '../../../API-Alumnos/Compromiso';
import { FetchDetalleAlumno } from '../../../API/DetalleAlumno';
import { solicitarBajaAlumno, verficarBajaAlumno } from '../../../API-Alumnos/DarseBaja';
import Cookies from 'js-cookie';
import ModalConfirmar from './ModalConfir';

interface Alumno {
  full_name: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado_academico: string;
  estado_financiero: string;
  ultimo_cursado: string;
  estado_baja: string;
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
    year: 'numeric',
  });
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [compromisoFirmado, setCompromiso] = useState<CompromisoResponse | null>(null);
  const [motivoBaja, setMotivoBaja] = useState<string | null>(null);
  const [puedeSolicitarBaja, setPuedeSolicitarBaja] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDarseBaja = () => {
    onOpen();
  };

  const fetchCompromiso = async () => {
    try {
      const data = await FetchCompromisos(undefined);
      setCompromiso(data);
    } catch (error) {
      console.error('Error al obtener los datos del compromiso', error);
    }
  };

  const fetchDetalleAlumno = async (dni: any) => {
    try {
      const data = await FetchDetalleAlumno(dni);
      console.log('detalle:', data);
      setAlumno(data);
    } catch (error) {
      console.error('Error al obtener detalle del alumno', error);
    }
  };

  const handleConfirmarBaja = async (motivo: string) => {
    if (alumno?.dni) {
      try {
        await solicitarBajaAlumno(alumno.dni, motivo);
        onClose();
        await fetchDetalleAlumno(alumno.dni);
        await fetchCompromiso();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const dni = Cookies.get('dni');
    if (dni) {
      fetchDetalleAlumno(dni);
      fetchCompromiso();
      verficarBajaAlumno(Number(dni)).then((resultado) => {
        setPuedeSolicitarBaja(resultado);
      });
    } else {
      console.error('DNI no encontrado en las cookies');
    }
  }, []);

  return (
    <Flex mt="20px" flexDirection="column" justifyContent="center" gap={5}>
      {compromisoFirmado &&
        compromisoFirmado.results[0]?.firmo_ultimo_compromiso &&
        alumno?.estado_academico !== 'Baja solicitada' && (
          <Alert status="warning">
            <AlertIcon />
            Si se da de baja, aún deberá abonar la cuota del mes en curso.
          </Alert>
        )}

      {(!compromisoFirmado || !compromisoFirmado.results[0]?.firmo_ultimo_compromiso) && (
        <Alert status="error">
          <AlertIcon />
          Compromiso de pago no firmado
        </Alert>
      )}
      {!puedeSolicitarBaja && (
        <Alert status="error">
          <AlertIcon />
          No se puede solicitar baja en este momento, debido a que no se encuentra dentro de la fecha permitida.
          </Alert>
      )}
      

        <Box
          w="100%"
          mb={7}
          display="flex"
          gap={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Tag w="100%" p="10px" fontSize={16}>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction={{ base: "column", md: "row" }}
            >
              <Text color="gray" textAlign="center">
                Estado Actual:
              </Text>
              <Text size="sm" fontWeight="semibold" textAlign="center">
                {alumno?.estado_baja || '-'}
              </Text>
            </Flex>
          </Tag>
          <Tag
            w="100%"
            p="10px"
            fontSize={16}
            bg={alumno?.estado_financiero === 'Habilitado' ? '#C0EBA6' : '#FF8A8A'}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              direction={{ base: "column", md: "row" }}
            >
              <Text color="gray" textAlign="center">
                Estado Financiero:
              </Text>
              <Text size="sm" fontWeight="semibold" textAlign="center">
                {alumno?.estado_financiero || '-'}
              </Text>
            </Flex>
          </Tag>
        </Box>
      {motivoBaja && (
        <Tag w="100%" p="10px" fontSize={16} mt="-25px">
          <Text fontWeight="semibold">Motivo de la baja: </Text>
          <Text pl="8px">{motivoBaja}</Text>
        </Tag>
      )}

      <Box w="100%" display="flex" justifyContent="center">
        <Button
          colorScheme="red"
          onClick={handleDarseBaja}
          isDisabled={
            !compromisoFirmado ||
            !compromisoFirmado.results[0]?.firmo_ultimo_compromiso ||
            alumno?.estado_baja !== null ||
            alumno?.estado_academico === 'Baja solicitada' ||
            alumno?.estado_academico === 'ACEPTADO' ||
            alumno?.estado_academico === 'RECHAZADO' ||
            !puedeSolicitarBaja //estado academico enrrealidad de estado de baja, fue un cambio de ultimo momento que se decidio hacer en el backend para no tener que cambiar el front
          }
        >
          Solicitar Baja
        </Button>
        <ModalConfirmar
          isOpen={isOpen}
          onClose={onClose}
          texto="¿Está seguro que desea darse de baja?"
          confirmar={handleConfirmarBaja}
        />
      </Box>
    </Flex>
  );
};

export default DarseBaja;