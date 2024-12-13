import { useEffect } from "react";
import { alumnosaHabilitar } from '../../../../../API/Inhabilitaciones';
import { useState } from "react";
import { Box, Button, Flex, Text, Spinner } from "@chakra-ui/react";
import Tabla from './Tabla';
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import * as XLSX from 'xlsx';

type Alumno = {
    user: number,
    full_name: string,
    estado_financiero: string,
    legajo: number,
};

export default function Habilitar() {

    const [alumnosHabilitar, setAlumnosHabilitar] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = ['Apellido y Nombre', 'Legajo', 'DNI'];
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


    const exportToExcel = () => {
        const headersExcel = ["Apellido y Nombre", "Legajo", "DNI"];
        const data = alumnosHabilitar.map((alumno) => ({
            "Apellido y Nombre": alumno.full_name,
            "Legajo": alumno.legajo,
            "DNI": alumno.user,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(worksheet, [headersExcel], { origin: "A1" });
        const columnWidths = headersExcel.map(() => ({ wch: 20 }));
        worksheet['!cols'] = columnWidths;
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");
        XLSX.writeFile(workbook, "alumnos_a_habilitar.xlsx");
    };

    return (
        <Box borderRadius={8} w={"100%"}>
            <Box w={"100%"}>
                {loading ? (
                    <Spinner />
                ) : alumnosHabilitar.length > 0 ? (
                    <Box justifyContent={"center"} w={"100%"}>
                         <Box w={"100%"} mb={4}>
                            <Button onClick={exportToExcel} colorScheme="blue">
                                Exportar a Excel
                            </Button>
                        </Box>
                        <Tabla headers={headers} data={alumnosHabilitar} /> 
                        <Box bottom="0" width="100%" bg="white" p="10px" mt={4} boxShadow="md">
                            <Flex justifyContent="space-between" alignItems={"center"}>
                                <Button onClick={handlePreviousPage} color="white"  isDisabled={offset1 === 0} leftIcon={<ArrowLeftIcon />}>
                                    Anterior
                                </Button>
                                <Text textAlign={"center"} mb={0}>
                                    Página {Math.ceil(offset1 / limit1) + 1} de {Math.ceil(totalInhabilitados / limit1)}
                                </Text>
                                <Button onClick={handleNextPage} color="white" isDisabled={offset1 + limit1 >= totalInhabilitados} rightIcon={<ArrowRightIcon />}>
                                    Siguiente
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                ) : (
                    <p>No hay datos para mostrar</p>
                )}
            </Box>
        </Box>
    );
}