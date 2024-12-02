import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button, Box, Text, Select, Flex,   Tag,  Alert, AlertIcon, } from '@chakra-ui/react';
import {AttachmentIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';
import TablaAlumnos from './TablaAlumnos';
import { FetchFirmantes,FetchNoFirmantes } from '../../../../API/AlumnosCompromisoPago';
import { useNavigate } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';

const AlumnosCompromisoPago: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada
  const [cuatrimestre, setCuatrimestre] = useState<string>(''); // Estado para el cuatrimestre
  const [anio, setAnio] = useState<string>(''); // Estado para el año
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  // Verificar si el formulario está completo (ambos campos seleccionados)
  const isFormValid = cuatrimestre !== '' && anio !== '';

  const handleSolicitar = () => {
    setFormSubmitted(true);
  };

  const handleBackClick = () => {
    setFormSubmitted(false);
  };
  return (
    <div>
      {!formSubmitted ? (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" p={4} py={12}>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Seleccione un año y cuatrimestre
          </Text>

          

          <Select
            placeholder="Seleccione un año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            mb={6}
            width="100%"
            maxWidth="400px"
          >
            <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          </Select>

          <Select
            placeholder="Seleccione un cuatrimestre"
            value={cuatrimestre}
            onChange={(e) => setCuatrimestre(e.target.value)}
            mb={4}
            width="100%" 
            maxWidth="400px" 
          >
            <option value="2C">Segundo Cuatrimestre</option>
            <option value="1C">Primer Cuatrimestre</option>
            
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
          <Button
            position="absolute"
            left="25%"
            color="white"
            size="sm"
            onClick={handleBackClick}
            m={4}
          >
            <ArrowLeftIcon mr="10px" /> Volver{' '}
          </Button>
          <Flex pt="60px" >
             <Alert status='info'> <AlertIcon /> Periodo Seleccionado: {anio} - {cuatrimestre == '1C' ? 'Primer Cuatrimestre' : 'Segundo Cuatrimestre'}</Alert>
            </Flex>  
          <Tabs w={"100%"}>
            <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
              <Tab
                   _selected={{
                   borderBottom: "2px solid",
                   borderColor: "blue.500",
                   color: "blue.500",
                   borderTop: "none",
                   borderLeft: "none",
                   borderRight: "none"
                   }}
                   _focus={{ boxShadow: "none" }}
                    >
                        Compromiso firmado
                </Tab>
                <Tab
                   _selected={{
                   borderBottom: "2px solid",
                   borderColor: "blue.500",
                   color: "blue.500",
                   borderTop: "none",
                   borderLeft: "none",
                   borderRight: "none"
                   }}
                   _focus={{ boxShadow: "none" }}
                    >
                      Compromiso pendiente de firma
                </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             
              <TablaAlumnos 
                fetchFunction={() => FetchFirmantes(cuatrimestre, parseInt(anio))}
                title="Alumnos que firmaron compromiso" 
              />
            </TabPanel>

            <TabPanel>
             
              <TablaAlumnos 
                fetchFunction={() => FetchNoFirmantes(cuatrimestre, parseInt(anio))}
                title="Alumnos que no firmaron compromiso" 
              />
            </TabPanel>


          </TabPanels>
        </Tabs>
      </Box>
      )
      }
    </div>
  );
};

export default AlumnosCompromisoPago;
