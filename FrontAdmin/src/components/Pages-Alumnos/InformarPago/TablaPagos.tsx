import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Badge, Checkbox, Input} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons'; 
import Cuotas from '../../../API-Alumnos/Pagos';
import {useState , useEffect} from 'react';
import { FetchGetCuotas } from '../../../API-Alumnos/Pagos';
import { get } from 'http';


function TablaCuotas () {

    const [cuotas, setCuotas] = useState<any[]>([]); 
    const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<any[]>([]);

    useEffect(() => {
        // Aca se deberia hacer el fetch de las cuotas del alumno
        const getCuotas = async () => {
        try {
            const cuotas = await FetchGetCuotas();
            setCuotas(cuotas);
        } catch (error) {
            console.error('Error:', error);
        }
        }
        getCuotas();
        // setCuotas(Cuotas)   
    }, [])

    useEffect(() => {
        console.log(cuotasSeleccionadas)  
    }, [cuotasSeleccionadas])

    // Funcion para manejar el cambio de estado de los checkbox, si el esatdo anterior es true, lo elimina del array, si es false lo agrega
    const handleCheckboxChange = (cuota:any) => {
        setCuotasSeleccionadas((prevSeleccionadas) => {
          if (prevSeleccionadas.includes(cuota)) {
            return prevSeleccionadas.filter((item) => item !== cuota);
          } else {
            return [...prevSeleccionadas, cuota];
          }
        });
      };


    return {
        jsx: (
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
            <Box
                borderRadius={8}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderWidth={1}
                p={3}
            >
            {cuotas.length > 0 ? (
                <Table variant="simple" width="100%">
                  <Thead>
                    <Tr mt={6}>
                      <Th></Th>
                      <Th textAlign="center" p={1}>Cuota</Th>
                      <Th textAlign="center">Fecha Primer VTO.</Th>
                      <Th textAlign="center">Valor Actual</Th>
                      <Th textAlign="center">Valor Pagado</Th>
                      <Th textAlign="center">Valor Informado</Th>
                      <Th textAlign="center">Valor Adeudado</Th>
                    
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cuotas.map((cuota, index) => (
                      <Tr key={index} >
                        { cuota.estado === "PAGADO" ?
                        <Td><Checkbox isDisabled={true}></Checkbox></Td>
                        :
                        <Td><Checkbox p={0} borderColor="black" 
                           onChange={(e) => handleCheckboxChange(cuota)} >
                        </Checkbox></Td>
                        }
                        <Td textAlign="center" p={1}>{cuota.numero}</Td>
                        <Td textAlign="center">{cuota.fechaVencimiento}</Td>
                        <Td textAlign="center">{"$ " + cuota.montoActual}</Td>
                        <Td textAlign="center">{"$ " + cuota.valorpagado}</Td>
                        <Td textAlign="center">{"$ " + cuota.valorinformado}</Td>
                        { cuota.estado !== "PAGADO" ?
                        <Td textAlign="center">{"$ " + (cuota.montoActual - cuota.valorpagado - cuota.valorinformado)}</Td>
                        : 
                        <Td textAlign="center">{"$ " + 0}</Td>
                        }
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
            ) : (
              <Text>No hay datos disponibles. Por favor, Firmar el compromiso de pago.</Text>
            )}
        </Box>
        </Flex>
        ),
        cuotasSeleccionadas: cuotasSeleccionadas
    }
}
export default TablaCuotas;