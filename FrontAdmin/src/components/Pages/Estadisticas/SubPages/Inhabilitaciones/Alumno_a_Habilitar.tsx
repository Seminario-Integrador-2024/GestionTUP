import { useEffect } from "react";
import { alumnosaHabilitar } from '../../../../../API/Inhabilitaciones';
import { useState } from "react";
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner } from "@chakra-ui/react";
import Tabla from './Tabla';
import { IoEyeOutline } from "react-icons/io5";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

type Alumno = {
    user: number,
    full_name: string,
    estado_financiero: string,
    legajo: number,
};




export default function Habilitar() {

    const [alumnosHabilitar, setAlumnosHabilitar] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = ['Apellido y Nombre', 'Legajo' , 'DNI'];
    const [limit1] = useState(10);
    const [offset1, setOffset1] = useState(0);
    const [totalInhabilitados, setTotalInhabilitados] = useState<number>(0);

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

    const fetchData = async () => {
        setLoading(true);
        try {
            const response2 = await alumnosaHabilitar();
            setAlumnosHabilitar(response2.results);
            setTotalInhabilitados(response2.count);
            setLoading(false);
        } catch (error) {
            throw error;
        }
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
            {loading ? (
                                <Spinner />
                            ) : 
                            alumnosHabilitar.length > 0 ?
                            (
                            <Box justifyContent={"center"} w={"100%"}>
                                    <Tabla headers={headers} data={alumnosHabilitar} /> 
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
                        ): <p>No hay datos para mostrar</p>}
            </Box>
        
        </Box>

    );
}