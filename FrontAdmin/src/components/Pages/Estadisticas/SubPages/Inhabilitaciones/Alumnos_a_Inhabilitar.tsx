import { useEffect } from "react";
import { getAlumnosaInhabilitar } from '../../../../../API/Inhabilitaciones';
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Tabla from './Tabla';

export default function AInhabilitar() {

    const [alumnosAInhabilitar, setAlumnosAInhabilitar] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = ['Apellido y Nombre', 'Legajo' , 'DNI'];

    const fetchData = async () => {
        setLoading(true);
        const response2 = await getAlumnosaInhabilitar();
        setAlumnosAInhabilitar(response2.results);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
        borderRadius={8}
        w={"100%"}
        >
        
            <Box w={"100%"}>
                <Flex justifyContent={"center"} w={"100%"}>
                    {alumnosAInhabilitar.length > 0 ? ( <Flex direction={"column"} w={"100%"}>
                    <Tabla headers={headers} data={alumnosAInhabilitar} /> 
                    </Flex>
                    ) : <p>No hay datos para mostrar</p>}
                </Flex>
            </Box>
        
        </Box>

    );
}