import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AbonaronCuota, NoAbonaronCuota } from "../../../../../API/AbonaronCuota";
import { Box, Button, Flex, Tab, TabList, Text ,TabPanel, TabPanels, Tabs, Tag, Spinner, Input, Tooltip, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Tabla from "./Tabla";
import {ArrowRightIcon, ArrowLeftIcon, InfoIcon, SearchIcon} from '@chakra-ui/icons';
import { isLastDayOfMonth, set } from "date-fns";

export default function Listado() {
    type Alumno = {
        user: number;
        full_name: string;
        estado_financiero: string;
        legajo: number;
        cuota_monto: number;
        pago_parcial: boolean;
        monto_restante: number;
        monto_pagado: number;
      };

    const {fecha} = useParams<{ fecha: string }>();
    const [abonaron, setAbonaron] = useState<Alumno[]>([]);
    const [totalabonaron, setTotalAbonaron] = useState<number>(0);
    const [noAbonaron, setNoAbonaron] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loading2, setLoading2] = useState<boolean>(true);
    const [totalNoAbonaron, setTotalNoAbonaron] = useState<number>(0);
    const headersAdeudan = ['Apellido y Nombre', 'Legajo' , 'DNI', 'Monto Cuota', 'Monto Adeudado'];
    const headersAbonaron = ['Apellido y Nombre', 'Legajo' , 'DNI', 'Monto Cuota', 'Monto Abonado'];
    const [limit1] = useState(10);
    const [offset1, setOffset1] = useState(0);
    const [limit2] = useState(10);
    const [offset2, setOffset2] = useState(0);
    const [filter, setFilter] = useState<string>('');
    const [ MtotalNoAbonaron, setMTotalNoAbonaron] = useState<number>(0);
    const [ MtotalAbonaron, setMTotalAbonaron] = useState<number>(0);

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

    const handleNextPage2 = () => {
        if (offset2 + limit2 < totalabonaron) {
          setOffset2(offset2 + limit2);
        }
      };
    
      const handlePreviousPage2 = () => {
        if (offset2 > 0) {
          setOffset2(offset2 - limit2);
        }
    };
    

    useEffect(() => {
    
        const fetchNoAbonaron = async (fecha: string) => {
            const data = await NoAbonaronCuota(fecha, limit1, offset1, filter);
           
            if (data.results?.results?.length > 0) {
          
            setNoAbonaron(data.results.results);
            setMTotalNoAbonaron(data.monto_total_a_cobrar);
            setTotalNoAbonaron(data.results.count);
           
            }
            setLoading(false);
        }
        if (fecha === undefined) {
            return;
        }
        fetchNoAbonaron(fecha);

    }, [limit1, offset1, fecha, filter]);

    useEffect(() => {
        const fetchAbonaron = async (fecha: string) => {
            const data = await AbonaronCuota(fecha, limit2, offset2, filter);

            if (data.alumnos?.results?.length > 0) {
                setAbonaron(data.alumnos.results);
                setMTotalAbonaron(data.recaudado_por_el_mes);
                setTotalAbonaron(data.alumnos.count);
            }
            setLoading2(false);
        }
        if (fecha === undefined) {
            return;
        }
        fetchAbonaron(fecha);
    }, [limit2, offset2, fecha, filter]);


    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
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
                        Abonaron
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
                        Adeudan
                    </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                        <Flex>
                            {loading2 ? <Flex justifyContent={"center"} w={"100%"}> <Spinner size="xl" /> </Flex>:
                            abonaron.length > 0 ? <Flex direction={"column"} w={"100%"}>
                                 <Flex direction={"column"} w={"100%"} justifyContent={"center"} gap={1} mb={3} >
                                 <Flex  direction={'row'} gap={2}>
                                    <Tag bg="secundaryBg" w={"100%"} size="lg" p={"10px"} fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Periodo: {fecha} </Tag>
                                    <Tag bg="secundaryBg" w={"100%"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Total Alumnos: {totalabonaron}</Tag>
                                 </Flex>   
                                    <Tag bg="secundaryBg" w={"100%"}  p={"10px"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Monto Total: { "$ " + new Intl.NumberFormat('es-ES', { notation: "compact", compactDisplay: "short" }).format(MtotalAbonaron)}
                                    <Tooltip label="Sumatoria del monto abonado por cada alumno" fontSize="md">
                                        <InfoIcon ml={2} />
                                    </Tooltip>
                                    </Tag>
                                 </Flex>
                                    <InputGroup mb={4}>
                                        <InputLeftElement pointerEvents="none">
                                            <SearchIcon color="gray.300" />
                                        </InputLeftElement>
                                        <Input type="text" value={filter} onChange={handleFilterChange} placeholder="Buscar por Apellido y Nombre, Legajo o DNI..." w={"100%"} />
                                    </InputGroup>
                                    <Tabla headers={headersAbonaron} data={abonaron} /> 
                                    <Box bottom="0" width="100%" bg="white" p="10px" mt={2} boxShadow="md" >
                                            <Flex justifyContent="space-between" alignItems={"center"}>
                                            <Button onClick={handlePreviousPage2} isDisabled={offset2 === 0} color="white" leftIcon={<ArrowLeftIcon/>}>
                                                Anterior
                                            </Button>
                                            <Text textAlign={"center"} mb={0}>Página {Math.ceil(offset2 / limit2) + 1} de {Math.ceil(totalabonaron / limit2)}</Text>
                                            <Button onClick={handleNextPage2} isDisabled={offset2 + limit2 >= totalabonaron} color="white" rightIcon={<ArrowRightIcon/>}>
                                                Siguiente
                                            </Button>
                                            </Flex>
                                    </Box>
                                </Flex>
                            : <p>No hay datos para mostrar</p>}
                        </Flex>
                        </TabPanel>
                        <TabPanel>
                        <Flex>
                            {loading ? <Flex justifyContent={"center"} w={"100%"}> <Spinner size="xl" /> </Flex>:
                            noAbonaron.length > 0 ? <Flex direction={"column"} w={"100%"} alignItems={"center"}>
                                <Flex direction={"column"} w={"100%"} justifyContent={"center"} gap={1} mb={3} >
                                    <Flex  direction={'row'} gap={2}>
                                    <Tag bg="secundaryBg" w={"100%"} p={"10px"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Periodo: {fecha} </Tag>
                                    <Tag bg="secundaryBg" w={"100%"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Total Alumnos: {totalNoAbonaron}</Tag>
                                    </Flex>
                                    <Tag bg="secundaryBg" w={"100%"} p={"10px"} size="lg" fontSize={18} display="flex" justifyContent="center" fontWeight={"bold"} fontFamily={"serif"}> Monto Total: { "$ " + new Intl.NumberFormat('es-ES', { notation: "compact", compactDisplay: "short" }).format(MtotalNoAbonaron)}
                                    <Tooltip label="Sumatoria del monto restante adeudado por cada alumno" fontSize="md">
                                        <InfoIcon ml={2} />
                                    </Tooltip>
                                    </Tag>
                                </Flex>

                                    <InputGroup mb={4}>
                                        <InputLeftElement pointerEvents="none">
                                            <SearchIcon color="gray.300" />
                                        </InputLeftElement>
                                        <Input type="text" value={filter} onChange={handleFilterChange} placeholder="Buscar por Apellido y Nombre, Legajo o DNI..." w={"100%"} />
                                    </InputGroup>

                                    <Tabla headers={headersAdeudan} data={noAbonaron} /> 
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
