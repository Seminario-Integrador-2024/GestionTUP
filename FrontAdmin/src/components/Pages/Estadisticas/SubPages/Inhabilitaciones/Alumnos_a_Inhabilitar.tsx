import { useEffect } from "react";
import { getAlumnosaInhabilitar } from '../../../../../API/Inhabilitaciones';
import { useState } from "react";
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import Tabla from './Tabla';
import { IoEyeOutline } from "react-icons/io5";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

type Alumno = {
    user: number,
    full_name: string,
    estado_financiero: string,
    legajo: number,
    cuotas_adeudadas: Cuota[]
};

type Cuota = {
    monto: number,
    fecha_vencimiento: string,
    tipo: string
};

const prueba = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "user": 43665213,
        "full_name": "ACEVEDO, Gabriel Antonio",
        "estado_financiero": "Inhabilitado",
        "legajo": 25112,
        "cuotas_adeudadas": [
          {
            "monto": 10,
            "fecha_vencimiento": "2024-12-10",
            "tipo": "Cuota"
          },
          {
            "monto": 10,
            "fecha_vencimiento": "2025-01-10",
            "tipo": "Cuota"
          }
        ]
      }
    ]
  }  

export default function AInhabilitar() {

    const [alumnosAInhabilitar, setAlumnosAInhabilitar] = useState<Alumno[]>([]);
    const [selectedDni, setSelectedDni] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = ['Tipo', 'Fecha Vencimiento' , 'Monto'];
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
        const response2 = await getAlumnosaInhabilitar();
        setAlumnosAInhabilitar(response2.results);
        setTotalInhabilitados(response2.count);


        setAlumnosAInhabilitar(prueba.results);
    };

    const handleDetailsClick = (dni: string) => {
        if (selectedDni === dni) {
          setSelectedDni(null);
          return;
        }
        setSelectedDni(dni);
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
                <Flex justifyContent={"center"} w={"100%"} direction={'column'}>
                    {alumnosAInhabilitar.length > 0 ? ( 
                        <>
                        <Table variant="simple" mt={6} mb={5} borderWidth={1} borderColor={'grey.700'}>
                        <Thead>
                        <Tr>
                            <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Apellido y Nombre</Th>
                            <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">DNI</Th>
                            <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Legajo</Th>
                            <Th textAlign="center" fontFamily="Helvetica" fontWeight="900" w={"20%"}>Ver Detalles</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {alumnosAInhabilitar.map((alumno) => (
                                <Tr key={alumno.user}>
                                    <Td textAlign="center">{alumno.full_name}</Td>
                                    <Td textAlign="center">{alumno.user}</Td>
                                    <Td textAlign="center">{alumno.legajo}</Td>
                                    <Td textAlign="center">
                                        <Button bg='transparent' _hover='transparent' m="0px" p="0px" onClick={() => handleDetailsClick((alumno.user.toString()))}>
                                            <IoEyeOutline size="22px" />
                                        </Button>
                                    </Td>
                                </Tr>
                        ))}
                        </Tbody>
                        </Table>
                        {selectedDni && (
                            <Tabla headers={headers} data={alumnosAInhabilitar.find((alumno) => alumno.user === parseInt(selectedDni))?.cuotas_adeudadas || []} />
                        )}
                         <Box bottom="0" width="100%" bg="white" p="10px" mt={5} mb={5} boxShadow="md" >
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
                        </>
                    ) : <p>No hay datos para mostrar</p>}
                </Flex>
            </Box>
        
        </Box>

    );
}