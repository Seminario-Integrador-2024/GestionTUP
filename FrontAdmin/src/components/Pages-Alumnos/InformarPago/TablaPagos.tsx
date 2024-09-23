import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Badge, Checkbox, Input} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons'; 
import Cuotas from '../../../API-Alumnos/Pagos';
import {useState , useEffect} from 'react';


function TablaCuotas () {

    const [cuotas, setCuotas] = useState<any[]>([]); 
    const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<any[]>([]);

    useEffect(() => {
        setCuotas(Cuotas)   
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
                      <Th textAlign="center" p={1}>Numero</Th>
                      <Th textAlign="center">Fecha Vencimiento</Th>
                      <Th textAlign="center">Valor Actual</Th>
                      <Th textAlign="center">Valor Pagado</Th>
                      <Th textAlign="center">Valor Adeudado</Th>
                      <Th textAlign="center">Estado</Th>
                    
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
                        <Td textAlign="center">{"$ " + cuota.montoactual}</Td>
                        <Td textAlign="center">{"$ " + cuota.valorpagado}</Td>
                        <Td textAlign="center">{"$ " + cuota.valoradeudado}</Td>
                        { cuota.estado === "ADEUDADO" ?
                        <Td textAlign="center"> <Badge colorScheme='red'>{cuota.estado}</Badge></Td>
                        :
                        cuota.estado === "INFORMADO" ?
                        <Td textAlign="center"> <Badge colorScheme='yellow'>{cuota.estado}</Badge></Td>
                        :
                        <Td textAlign="center"> <Badge colorScheme='green'>{cuota.estado}</Badge></Td>
                        }
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
            ) : (
              <Text>No hay datos disponibles</Text>
            )}
        </Box>
        </Flex>
        ),
        cuotasSeleccionadas: cuotasSeleccionadas
    }
}
export default TablaCuotas;