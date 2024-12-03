import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, TabPanel, Button, Box, Text, Select, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import TablaAlumnos from './TablaAlumnos';
import { FetchAbonaronMatricula } from '../../../../API/AlumnosAbonaronMatricula';
import { FetchNoAbonaronMatricula } from '../../../../API/AlumnosAbonaronMatricula';
import Pestaña from './Pestaña';

const Matricula: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada
  const [cuatrimestre, setCuatrimestre] = useState<string>(''); // Estado para el cuatrimestre
  const [anio, setAnio] = useState<string>(''); // Estado para el año
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [años, setAños] = useState<string[]>([]); // Estado para los años disponibles

  // Verificar si el formulario está completo (ambos campos seleccionados)
  const isFormValid = cuatrimestre !== '' && anio !== '';

  const handleSolicitar = () => {
    setFormSubmitted(true);
  };

  const handleBackClick = () => {
    setFormSubmitted(false);
  };

  // Función para generar los años disponibles
  const generarAños = () => {
    const añoActual = new Date().getFullYear();
    return [añoActual.toString(), (añoActual - 1).toString(), (añoActual - 2).toString()];
  };

  // Al montar el componente, generamos los años disponibles
  useEffect(() => {
    setAños(generarAños());
  }, []);

  return (
    <div>
      {!formSubmitted ? (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" p={4} py={12}>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Seleccione un cuatrimestre y un año
          </Text>

          <Select
            placeholder="Seleccione un año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            mb={6}
            width="100%"
            maxWidth="400px"
          >
            {años.map((año) => (
              <option key={año} value={año}>
                {año}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Seleccione un cuatrimestre"
            value={cuatrimestre}
            onChange={(e) => setCuatrimestre(e.target.value)}
            mb={4}
            width="100%" 
            maxWidth="400px" 
          >
            <option value="1C">Primer Cuatrimestre</option>
            <option value="2C">Segundo Cuatrimestre</option>
          </Select>

          <Button
            colorScheme="blue"
            color="white"
            onClick={handleSolicitar}
            isDisabled={!isFormValid}  
            width="100%"  
            maxWidth="400px"  
            size="lg"  
          >
            Solicitar
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Botón Volver */}
          <Button
            colorScheme="blue"
            color="white"
            onClick={handleBackClick}
            size="sm"
            position="absolute"
            left="25%"
            m={4}
          >
            <ArrowLeftIcon mr="10px" /> Volver
          </Button>
          
          {/* Mensaje de Periodo Seleccionado */}
          <Flex pt="60px" >
            <Alert status="info">
              <AlertIcon />
              Periodo Seleccionado: {anio} - {cuatrimestre === '1C' ? 'Primer Cuatrimestre' : 'Segundo Cuatrimestre'}
            </Alert>
          </Flex>
          
          <Tabs variant="enclosed" index={index} onChange={setIndex} isLazy>
            <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
              <Pestaña title="Abonaron" />
              <Pestaña title="No Abonaron" />
            </TabList>

            <TabPanels>
              <TabPanel>
                <TablaAlumnos 
                  fetchFunction={() => FetchAbonaronMatricula(cuatrimestre, parseInt(anio))}
                  title="Alumnos que abonaron matrícula" 
                />
              </TabPanel>
              <TabPanel>
                <TablaAlumnos 
                  fetchFunction={() => FetchNoAbonaronMatricula(cuatrimestre, parseInt(anio))}
                  title="Alumnos que no abonaron matrícula" 
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </div>
  );
};

export default Matricula;
