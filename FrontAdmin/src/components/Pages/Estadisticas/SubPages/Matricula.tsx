import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, TabPanel, Button, Box, Text, Select } from '@chakra-ui/react';
import TablaAlumnos from './TablaAlumnos';
import { FetchAbonaronMatricula } from '../../../../API/AlumnosAbonaronMatricula';
import { FetchNoAbonaronMatricula } from '../../../../API/AlumnosAbonaronMatricula';
import Pestaña from './Pestaña';

const Matricula: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada
  const [cuatrimestre, setCuatrimestre] = useState<string>(''); // Estado para el cuatrimestre
  const [anio, setAnio] = useState<string>(''); // Estado para el año
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Verificar si el formulario está completo (ambos campos seleccionados)
  const isFormValid = cuatrimestre !== '' && anio !== '';

  const handleSolicitar = () => {
    setFormSubmitted(true);
  };

  return (
    <div>
      {!formSubmitted ? (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" p={4} py={12}>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Seleccione un cuatrimestre y un año
          </Text>

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

          <Select
            placeholder="Seleccione un año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            mb={6}
            width="100%"
            maxWidth="400px"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
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
      )}
    </div>
  );
};

export default Matricula;
