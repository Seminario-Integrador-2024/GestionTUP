import { useEffect, useState } from "react";
import { getAlumnosaInhabilitar } from '../../../../../API/Inhabilitaciones';
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TablaDetalle from "./TablaDetalles";
import * as XLSX from 'xlsx';

type Alumno = {
  user: number;
  full_name: string;
  estado_financiero: string;
  legajo: number;
  cuotas_adeudadas: Cuota[];
};

type Cuota = {
  monto: number;
  fecha_vencimiento: string;
  tipo: string;
};

export default function AInhabilitar() {
  const [alumnosAInhabilitar, setAlumnosAInhabilitar] = useState<Alumno[]>([]);
  const [selectedDni, setSelectedDni] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const headers = ['Tipo', 'Fecha Vencimiento', 'Monto'];
  const [limit1] = useState(10);
  const [offset1, setOffset1] = useState(0);
  const navigate = useNavigate();
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
    setLoading(false);
  };

  const handleDetailsClick = (dni: string) => {
    if (selectedDni === dni) {
      setSelectedDni(null);
      return;
    }
    setSelectedDni(dni);
  };

  const handleRowClick = (dni: any) => {
    navigate(`/admin/alumnos/${dni}`);
  };

  const exportToExcel = () => {
    const headersExcel = ["Apellido y Nombre", "DNI", "Legajo", "Cantidad de Cuotas Adeudadas"];

    const data = alumnosAInhabilitar.map((alumno) => ({
      "Apellido y Nombre": alumno.full_name,
      "DNI": alumno.user,
      "Legajo": alumno.legajo,
      "Cantidad de Cuotas Adeudadas": alumno.cuotas_adeudadas.length,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(worksheet, [headersExcel], { origin: "A1" });
    const columnWidths = headersExcel.map(() => ({ wch: 20 }));
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos a Inhabilitar");

    XLSX.writeFile(workbook, "alumnos_a_inhabilitar.xlsx");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box borderRadius={8} w={"100%"}>
      <Box w={"100%"}>
        <Flex justifyContent={"center"} w={"100%"} direction={'column'}>
        <Box w={"100%"} mb={4}>
                <Button onClick={exportToExcel} colorScheme="blue">
                  Exportar a Excel
                </Button>
              </Box>
          {alumnosAInhabilitar.length > 0 ? (
            <>
              <Table variant="simple" mt={6} mb={5} borderWidth={1} borderColor={'grey.700'}>
                <Thead>
                  <Tr>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Apellido y Nombre</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">DNI</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900">Legajo</Th>
                    <Th textAlign="center" fontFamily="Helvetica" fontWeight="900" w={"20%"}>Ver Cuotas Vencidas</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {alumnosAInhabilitar.map((alumno) => (
                    <Tr key={alumno.user} cursor="pointer" _hover={{ bg: 'gray.200' }}>
                      <Td textAlign="center" onClick={() => handleRowClick(alumno.user)}>{alumno.full_name}</Td>
                      <Td textAlign="center" onClick={() => handleRowClick(alumno.user)}>{new Intl.NumberFormat('es-ES').format(alumno.user)}</Td>
                      <Td textAlign="center" onClick={() => handleRowClick(alumno.user)}>{new Intl.NumberFormat('es-ES').format(alumno.legajo)}</Td>
                      <Td textAlign="center">
                        <Button bg='transparent' _hover={{ bg: 'transparent' }} m="0px" p="0px" onClick={() => handleDetailsClick((alumno.user.toString()))}>
                          <IoEyeOutline size="22px" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {selectedDni && (
                <TablaDetalle headers={headers} data={alumnosAInhabilitar.find((alumno) => alumno.user === parseInt(selectedDni))?.cuotas_adeudadas || []} />
              )}



              <Box bottom="0" width="100%" bg="white" p="10px" mt={5} mb={5} boxShadow="md">
                <Flex justifyContent="space-between" alignItems={"center"}>
                  <Button onClick={handlePreviousPage} isDisabled={offset1 === 0} leftIcon={<ArrowLeftIcon />}>
                    Anterior
                  </Button>
                  <Text textAlign={"center"} mb={0}>
                    Página {Math.ceil(offset1 / limit1) + 1} de {Math.ceil(totalInhabilitados / limit1)}
                  </Text>
                  <Button onClick={handleNextPage} isDisabled={offset1 + limit1 >= totalInhabilitados} rightIcon={<ArrowRightIcon />}>
                    Siguiente
                  </Button>
                </Flex>
              </Box>
            </>
          ) : (
            <p>No hay datos para mostrar</p>
          )}
        </Flex>
      </Box>
    </Box>
  );
}