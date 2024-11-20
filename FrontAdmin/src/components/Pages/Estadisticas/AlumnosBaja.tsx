import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import ModalComponent from '../../Modal/ModalConfirmarCambios';

interface BajaInfo {
  dni: number;
  nombre: string;
  motivo: string;
  solicitud: string;
}

const AlumnosBaja = () => {
  const [bajas, setBajas] = useState<BajaInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBaja, setSelectedBaja] = useState<BajaInfo | null>(null);
  const [accion, setAccion] = useState<'aceptar' | 'rechazar'>('aceptar');

  useEffect(() => {
    // Obtener las solicitudes de baja del local storage
    const bajaAlumnos = localStorage.getItem('bajaAlumnos');
    if (bajaAlumnos) {
      setBajas(JSON.parse(bajaAlumnos));
    }
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

  const confirmarAccion = () => {
    if (selectedBaja) {
      const nuevasBajas = bajas.map(baja =>
        baja.dni === selectedBaja.dni ? { ...baja, solicitud: accion === 'aceptar' ? 'aceptado' : 'rechazado' } : baja
      );
      localStorage.setItem('bajaAlumnos', JSON.stringify(nuevasBajas));
      setBajas(nuevasBajas);
      console.log(`Solicitud de baja ${accion} para el alumno con DNI: ${selectedBaja.dni}`);
    }
  };

  return (
    <div>

      {bajas.length === 0 ? (
        <Text textAlign="center">No hay solicitudes de baja.</Text>
      ) : (
        bajas.map(baja => (
          <Box key={baja.dni} p={4} borderWidth={1} borderRadius="md" mb={4}>
            <Text><strong>Nombre:</strong> {baja.nombre}</Text>
            <Text><strong>DNI:</strong> {baja.dni}</Text>
            <Text><strong>Motivo:</strong> {baja.motivo}</Text>
            <Text><strong>Estado:</strong> {baja.solicitud.toUpperCase()}</Text>
            <Flex mt={2} justifyContent="space-between">
              <Button colorScheme="green" onClick={() => handleAceptar(baja)}>Aceptar</Button>
              <Button colorScheme="red" onClick={() => handleRechazar(baja)}>Rechazar</Button>
            </Flex>
          </Box>
        ))
      )}
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
