import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import ModalComponent from '../../Modal/ModalConfirmarCambios';
import { bajasSolicitadas, responderBaja, dadosDeBaja } from '../../../API-Alumnos/DarseBaja';

interface BajaInfo {
  dni: number;
  nombre: string;
  motivo: string;
  estado: string;
  estado_academico: string;
  puede_solicitar: boolean;
}

const AlumnosBaja = () => {
  const [bajas, setBajas] = useState<BajaInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBaja, setSelectedBaja] = useState<BajaInfo | null>(null);
  const [accion, setAccion] = useState<'aceptar' | 'rechazar'>('aceptar');
  const [alumnosBajas, setAlumnosBajas] = useState<BajaInfo[]>([]);

  useEffect(() => {
    const fetchBajas = async () => {
      const bajaAlumnos = await bajasSolicitadas();
      if (bajaAlumnos) {
        setBajas(bajaAlumnos); // Asumiendo que bajasSolicitadas() devuelve un arreglo de BajaInfo
      }
    };
    fetchBajas();
  }, []);

  const handleAceptar = (baja: BajaInfo) => {
    setSelectedBaja(baja);
    setAccion('aceptar');
    setIsModalOpen(true);
  };

  const handleRechazar = (baja: BajaInfo) => {
    setSelectedBaja(baja);
    setAccion('rechazar');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchBajas = async () => {
      const alumnosDadosDeBaja = await dadosDeBaja();
      if (alumnosDadosDeBaja) {
        setAlumnosBajas(alumnosDadosDeBaja); 
      }
    };
    fetchBajas();
  }, []);
  

  const confirmarAccion = () => {
    if (selectedBaja) {
      const nuevasBajas = bajas.map(async bajaItem =>
        bajaItem.dni === selectedBaja.dni
          ? await responderBaja(selectedBaja.dni, accion === 'aceptar' ? 'ACEPTADO' : 'RECHAZADO')
          : bajaItem
      );
    }
    setIsModalOpen(false);
    window.location.reload(); 
  };

  return (
    <div>
      { 
        bajas.map(baja => (
          <Box key={baja.dni} p={4} borderWidth={1} borderRadius="md" mb={4} mt={4}>
            <Text>
              <strong>Nombre:</strong> {baja.nombre}
            </Text>
            <Text>
              <strong>DNI:</strong> {baja.dni}
            </Text>
            <Text>
              <strong>Motivo:</strong> {baja.motivo}
            </Text>
            <Text>
              <strong>Estado:</strong> {baja.estado.toUpperCase()}
            </Text>
            
            <Flex mt={2} justifyContent="space-between">
              <Button colorScheme="green" onClick={() => handleAceptar(baja)}>
                Aceptar
              </Button>
              <Button colorScheme="red" onClick={() => handleRechazar(baja)}>
                Rechazar
              </Button>
            </Flex>
          </Box>
        ))
      }
      {selectedBaja && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          texto={`¿Está seguro que desea ${accion} la solicitud de baja del alumno ${selectedBaja.nombre}?`}
          confirmar={confirmarAccion}
        />
      )}
       {
        alumnosBajas.map(baja => (
          <Flex key={baja.dni} p={4} borderWidth={1} borderRadius="md" mb={4} padding={4} >
            <Text m={4}>
              <strong>Nombre:</strong> {baja.nombre}
            </Text>
            <Text m={4}>
              <strong>DNI:</strong> {baja.dni}
            </Text>
            <Text m={4}>
              <strong>Motivo:</strong> {baja.motivo}
            </Text>
            <Text m={4}>
              <strong>Estado de la solicitud:</strong> {baja.estado.toUpperCase()}
            </Text>
            
          </Flex>
        ))
      }
      {selectedBaja && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          texto={`¿Está seguro que desea ${accion} la solicitud de baja del alumno ${selectedBaja.nombre}?`}
          confirmar={confirmarAccion}
        />
      )}
    </div>
  );
};

export default AlumnosBaja;
