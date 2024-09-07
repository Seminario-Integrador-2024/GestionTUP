import { useParams } from 'react-router-dom';
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Spacer,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material';
import logoUser from '../../../icons/logo-user.png';
import { useNavigate } from 'react-router-dom';
import { FetchDetalleAlumno } from '../../../../API/DetalleAlumno.ts';
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface Alumno {
  apellido: string;
  nombre: string;
  dni: number;
  legajo: number;
  email: string;
  telefono: number;
  estado: string;
}

function FichaAlumno() {
  const { dni } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Define el estado con un valor inicial de null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retrocede en el historial de navegación
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchDetalleAlumno(dni);
        setAlumno(data); 
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    if (dni) {
      fetchData();
    }
  }, [dni]); // Incluye `dni` como dependencia

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error al cargar los datos.</Text>;
  }

  if (!alumno) {
    return <Text>No se encontraron datos.</Text>;
  }

  return (
    <Flex mt="20px">
      <Button
        position="absolute"
        right="10"
        color="white"
        size="sm"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon mr="10px" /> Volver{' '}
      </Button>
      <Box borderRight="1px solid #cbd5e0" w="20%" minH="80vh" p="20px">
        <Flex justifyContent="center" m="20px">
          <Image src={logoUser} w="120px" />
        </Flex>
        <Text color="gray">Apellido y nombre</Text>
        <Text
          size="sm"
          textAlign="center"
          pl="8px"
          fontWeight="Bold"
        >{`${alumno.apellido}, ${alumno.nombre}`}</Text>
        <Text color="gray" mt="10px">
          Número DNI:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.dni}
        </Text>
        <Text color="gray" mt="10px">
          Legajo:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.legajo}
        </Text>
        <Text color="gray" mt="10px">
          Email:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold">
          {alumno.email}
        </Text>
        <Text color="gray" mt="10px">
          Celular
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.telefono}
        </Text>

        <hr></hr>

        <Text color="gray" mt="20px">
          Compromiso de Pago:{' '}
        </Text>
        <Text size="sm" textAlign="center" pl="8px" fontWeight="Bold">
          Firmado
        </Text>
        <Text color="gray" mt="10px">
          Estado:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          {alumno.estado}
        </Text>
        <Text color="gray" mt="10px">
          Deuda:
        </Text>
        <Text size="sm" pl="8px" fontWeight="semibold" mb="20px">
          -
        </Text>
      </Box>
    </Flex>
  );
}

export default FichaAlumno;
