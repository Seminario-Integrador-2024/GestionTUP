import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AbonaronCuota, NoAbonaronCuota } from "../../../../../API/AbonaronCuota";
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Tag } from "@chakra-ui/react";
import Tabla from "./Tabla";

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

    useEffect(() => {

        const fetchAbonaron = async (fecha: string) => {
            const data = await AbonaronCuota(fecha);
            setAbonaron(data.results);
            setTotalAbonaron(data.count);
        }

        const fetchNoAbonaron = async (fecha: string) => {
            const data = await NoAbonaronCuota(fecha);
            setNoAbonaron(data.results);
            setTotalNoAbonaron(data.count);
        }

        if (fecha === undefined) {
            return;
        }
        fetchAbonaron(fecha);
        fetchNoAbonaron(fecha);
    }, []);

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
                            {noAbonaron.length > 0 ? <Flex direction={"column"} w={"100%"}>
                                <Flex direction={"row"} w={"100%"} flex={1} textAlign={"center"} ml={"33%"} gap={4} mb={3}>
                                    <Tag bg="secundaryBg" size="lg" fontSize={18} fontWeight={"bold"} fontFamily={"serif"}> Periodo: {fecha} </Tag>
                                    <Tag bg="secundaryBg" size="lg" fontSize={18} fontWeight={"bold"} fontFamily={"serif"}> Total: {totalNoAbonaron}</Tag>
                                </Flex>
                                    <Tabla headers={headers} data={noAbonaron} /> 
                             </Flex>
                            : <p>No hay datos para mostrar</p>}
                        </Flex>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
           
        </Flex>
    )
}
