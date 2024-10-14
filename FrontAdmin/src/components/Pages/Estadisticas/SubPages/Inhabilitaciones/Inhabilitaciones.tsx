import React, { useEffect, useState } from 'react';
import {getInhabilitaciones} from '../../../../../API/Inhabilitaciones';
import Tabla from '../Cuotas/Tabla';
import { Box, Button, Flex, Tab, TabList, Text ,TabPanel, TabPanels, Tabs, Tag, Spinner, Input } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

function Inhabilitados() {
  const [inhabilitados, setInhabilitados] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const headers = ['Apellido y Nombre', 'Legajo' , 'DNI', 'Estado financiero'];
  const [limit1] = useState(10);
  const [offset1, setOffset1] = useState(0);
  const [totalInhabilitados, setTotalInhabilitados] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInhabilitaciones();
      setInhabilitados(response);
      setTotalInhabilitados(response.length);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNextPage = () => {   
    if (offset1 + limit1 < totalInhabilitados) {
      setOffset1(offset1 + limit1);
    }
  };

  const handlePreviousPage = () => {
        if (offset1 > 0) {
        setOffset1(offset1 - limit1);
        }
 };



  return (
    <Flex w={"100%"}
    justifyContent={"center"}
    alignItems={"center"}
    flex={1}>
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
                    Alumnos a Habilitar
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
                    Alumnos Inhabilitados
                </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>

                    <Flex>
                        <Box
                            borderRadius={8}
                            borderColor={"gray.200"}
                            borderStyle={"solid"}
                            borderWidth={1}
                            p={3}
                        >
                        {loading ? (
                                <Spinner />
                            ) : (
                            <Box>
                                <Flex>
                                    <Text fontSize="xl" fontWeight="bold">Habilitar</Text>
                                </Flex>
                            </Box>
                        )}
                        </Box>
                    </Flex>
                    </TabPanel>
                    <TabPanel>
                    <Flex>
                        
                        {loading ? (
                                <Spinner />
                            ) : (
                            <Box justifyContent={"center"} w={"100%"}>
                                <Flex direction={"column"} w={"100%"} mb={4}>
                                    <Tag  bg="secundaryBg" w={"100%"} p={"10px"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}>Total: {totalInhabilitados}</Tag>
                                </Flex>
                                <Box  borderRadius={8}
                                    borderColor={"gray.200"}
                                    borderStyle={"solid"}
                                    w={"100%"}
                                    borderWidth={1}
                                    p={3}>
                                <Tabla headers={headers} data={inhabilitados} /> 
                                    <Box bottom="0" width="100%" bg="white" p="10px" mt={4} boxShadow="md" >
                                            <Flex justifyContent="space-between" alignItems={"center"}>
                                            <Button onClick={handlePreviousPage} isDisabled={offset1 === 0} color="white" leftIcon={<ArrowLeftIcon/>}>
                                                Anterior
                                            </Button>
                                            <Text textAlign={"center"} mb={0}>Página {Math.ceil(offset1 / limit1) + 1} de {Math.ceil(totalInhabilitados / limit1)}</Text>
                                            <Button onClick={handleNextPage} isDisabled={offset1 + limit1 >= totalInhabilitados} color="white" rightIcon={<ArrowRightIcon/>}>
                                                Siguiente
                                            </Button>
                                            </Flex>
                                </Box>
                                </Box>
                            </Box>
                        )}
                        
                    </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
  );
}

export default Inhabilitados;