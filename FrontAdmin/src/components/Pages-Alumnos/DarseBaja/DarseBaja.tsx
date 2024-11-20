import React, { useState, useEffect } from 'react';
import { Flex, Box, Tag, Text, Button, Alert, AlertIcon, useDisclosure } from '@chakra-ui/react';
import { FetchCompromisos } from '../../../API-Alumnos/Compromiso';
import { FetchDetalleAlumno } from '../../../API/DetalleAlumno';
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
  const [motivoBaja, setMotivoBaja] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDarseBaja = () => {
    onOpen();
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
      const bajaInfo = localStorage.getItem('bajaAlumnos');
      if (bajaInfo) {
        const parsedBajaInfo = JSON.parse(bajaInfo);
        const alumnoBaja = parsedBajaInfo.find((baja: any) => baja.dni === parseInt(dni));
        if (alumnoBaja) {
          setAlumno({
            ...data,
            estado_academico: alumnoBaja.solicitud === 'solicitado' ? 'Baja solicitada' : alumnoBaja.solicitud === 'aceptado' ? 'Baja aceptada' : alumnoBaja.solicitud === 'rechazado' ? 'Baja rechazada' : data.estado_academico,
          });
          setMotivoBaja(alumnoBaja.motivo);
        } else {
          setAlumno(data);
        }
      } else {
        setAlumno(data);
      }
    } catch (error) {
      console.error('Error al obtener los datos del alumno', error);
    }
  };

  const handleConfirmarBaja = async (motivo: string) => {
    if (alumno?.dni) {
        // Crear un objeto con la información del alumno y el motivo de la baja
        const bajaInfo = {
            dni: alumno.dni,
            nombre: alumno.full_name,
            motivo: motivo,
            solicitud: "solicitado",
        };

        // Obtener el arreglo de solicitudes de baja del local storage
        const bajaAlumnos = localStorage.getItem('bajaAlumnos');
        const parsedBajaAlumnos = bajaAlumnos ? JSON.parse(bajaAlumnos) : [];

        // Agregar la nueva solicitud de baja al arreglo
        parsedBajaAlumnos.push(bajaInfo);

        // Guardar el arreglo actualizado en el local storage
        localStorage.setItem('bajaAlumnos', JSON.stringify(parsedBajaAlumnos));

        console.log('Información de baja guardada en el local storage:', bajaInfo);

        // Recargar los datos del alumno y los compromisos
        const dni = Cookies.get('dni');
        if (dni) {
          await fetchDetalleAlumno(dni);
          await fetchCompromiso();
        }
    }
  };

  useEffect(() => {
    const dni = Cookies.get('dni');
    if (dni) {
      fetchDetalleAlumno(dni);
      fetchCompromiso();
    } else {
      console.error('DNI no encontrado en las cookies');
    }
  }, []);

  return (
    <Flex mt="20px" flexDirection={"column"} justifyContent={"center"} gap={5}>
      
      {(compromisoFirmado && compromisoFirmado.results[0]?.firmo_ultimo_compromiso && alumno?.estado_academico !== 'Baja solicitada') &&
      <Alert status='warning'>
      <AlertIcon />
      Si se da de baja, aún deberá abonar la cuota del mes en curso.
      </Alert>} 

      {(!compromisoFirmado || !compromisoFirmado.results[0]?.firmo_ultimo_compromiso) &&
      <Alert status='error'>
      <AlertIcon />
          Compromiso de pago no firmado
      </Alert>} 

      {alumno?.estado_academico === 'Activo' && <Box w={"100%"} >
        <Tag p="10px" w={"100%"} fontSize={18} fontWeight={"semibold"} textAlign={"center"} justifyContent={"center"}>
          Solicitud de Baja al {fechaDeHoy}
        </Tag>
      </Box>}

      {alumno?.estado_academico === 'Baja solicitada' && <Box w={"100%"} >
        <Tag p="10px" w={"100%"} fontSize={18} fontWeight={"semibold"} textAlign={"center"} justifyContent={"center"}>
          Baja solicitada el {fechaDeHoy}
        </Tag>
        
      </Box>}

      <Box w="100%" mb={7} display={"flex"} gap={4} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
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
      {motivoBaja && (
          <Tag w={"100%"} p="10px" fontSize={16} mt="-25px">
            <Text  fontWeight={"semibold"}>Motivo de la baja: </Text>
            <Text  pl="8px">{motivoBaja}</Text>
          </Tag>
        )}

      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <Button
          colorScheme="red"
          onClick={handleDarseBaja}
          isDisabled={!compromisoFirmado || !compromisoFirmado.results[0]?.firmo_ultimo_compromiso || alumno?.estado_academico === 'Baja solicitada' || alumno?.estado_academico === 'Baja aceptada' || alumno?.estado_academico === 'Baja rechazada' || alumno?.estado_academico === 'Inactivo'}
        >
          Solicitar Baja
        </Button>
        <ModalConfirmar isOpen={isOpen} onClose={onClose} texto="¿Está seguro que desea darse de baja?" confirmar={handleConfirmarBaja} />
      </Box>
    </Flex>
  );
};

export default DarseBaja;