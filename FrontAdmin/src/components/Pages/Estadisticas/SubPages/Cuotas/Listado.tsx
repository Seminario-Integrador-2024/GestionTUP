import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AbonaronCuota, NoAbonaronCuota } from "../../../../../API/AbonaronCuota";
import { Box, Button, Flex, Tab, TabList, Text ,TabPanel, TabPanels, Tabs, Tag } from "@chakra-ui/react";
import Tabla from "./Tabla";
import {ArrowRightIcon, ArrowLeftIcon} from '@chakra-ui/icons';

export default function Listado() {
    type Alumno = {
        user: number;
        full_name: string;
        estado_financiero: string;
      };
    const { fecha } = useParams<{ fecha: string }>();
    const [abonaron, setAbonaron] = useState<Alumno[]>([]);
    const [totalabonaron, setTotalAbonaron] = useState<number>(0);
    const [noAbonaron, setNoAbonaron] = useState<Alumno[]>([]);
    const [totalNoAbonaron, setTotalNoAbonaron] = useState<number>(0);
    const headers = ['Nombre',  'DNI', 'Situación'];
    const [limit1] = useState(10);
    const [offset1, setOffset1] = useState(0);

    const handleNextPage = () => {
        if (offset1 + limit1 < totalNoAbonaron) {
          setOffset1(offset1 + limit1);
        }
      };
    
      const handlePreviousPage = () => {
        if (offset1 > 0) {
          setOffset1(offset1 - limit1);
        }
    };
    

    useEffect(() => {

        const fetchAbonaron = async (fecha: string) => {
            const data = await AbonaronCuota(fecha);
            setAbonaron(data.results);
            setTotalAbonaron(data.count);
        }

        const fetchNoAbonaron = async (fecha: string) => {
            const data = await NoAbonaronCuota(fecha, limit1, offset1);
            setNoAbonaron(data.results);
            setTotalNoAbonaron(data.count);
        }

        if (fecha === undefined) {
            return;
        }
        fetchAbonaron(fecha);
        fetchNoAbonaron(fecha);

    }, [limit1, offset1]);

    return (
        <Flex w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}>
                <Tabs w={"100%"}>
                    <TabList>
                        <Tab>Abonaron</Tab>
                        <Tab>No abonaron</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                        <Flex>
                            {abonaron.length > 0 ? <Flex direction={"column"} w={"100%"}>
                                <Flex direction={"row"} w={"100%"} flex={1} textAlign={"center"} ml={"33%"} gap={4} mb={4}>
                                    <Tag colorScheme="secundaryBg" size="lg"> Total: {totalabonaron}</Tag>
                                    <Tag colorScheme="secundaryBg" size="lg"> Periodo: {fecha} </Tag>
                                </Flex>
                                    <Tabla headers={headers} data={abonaron} /> 
                                </Flex>
                            : <p>No hay datos para mostrar</p>}
                        </Flex>
                        </TabPanel>
                        <TabPanel>
                        <Flex>
                            {noAbonaron.length > 0 ? <Flex direction={"column"} w={"100%"} alignItems={"center"}>
                                <Flex direction={"row"} w={"100%"} flex={1} textAlign={"center"}  gap={4} mb={3} ml={'65%'}>
                                    <Tag bg="secundaryBg" size="lg" fontSize={18} fontWeight={"bold"} fontFamily={"serif"}> Periodo: {fecha} </Tag>
                                    <Tag bg="secundaryBg" size="lg" fontSize={18} fontWeight={"bold"} fontFamily={"serif"}> Total: {totalNoAbonaron}</Tag>
                                </Flex>
                                    <Tabla headers={headers} data={noAbonaron} /> 
                                    <Box bottom="0" width="100%" bg="white" p="10px" mt={2} boxShadow="md" >
                                            <Flex justifyContent="space-between" alignItems={"center"}>
                                            <Button onClick={handlePreviousPage} isDisabled={offset1 === 0} color="white" leftIcon={<ArrowLeftIcon/>}>
                                                Anterior
                                            </Button>
                                            <Text textAlign={"center"} mb={0}>Página {Math.ceil(offset1 / limit1) + 1} de {Math.ceil(totalNoAbonaron / limit1)}</Text>
                                            <Button onClick={handleNextPage} isDisabled={offset1 + limit1 >= totalNoAbonaron} color="white" rightIcon={<ArrowRightIcon/>}>
                                                Siguiente
                                            </Button>
                                            </Flex>
                                    </Box>
                             </Flex>
                            : <p>No hay datos para mostrar</p>}
                        </Flex>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
           
        </Flex>
    )
}
