import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Skeleton, Checkbox, Input} from '@chakra-ui/react'; 
import {useState , useEffect} from 'react';
import { FetchGetCuotas } from '../../../API-Alumnos/Pagos';
import { formatoFechaISOaDDMMAAAA } from '../../../utils/general';
import { motion } from 'framer-motion';

interface Cuota {
  id: number;
  numero: string;
  monto1erVencimiento: number;
  monto2doVencimiento: number;
  monto3erVencimiento: number;
  valortotal: number;
  valorpagado: number;
  valoradeudado: number;
  estado: string;
}

interface TablaCuotasProps {
  refresh: boolean;
  setCuotasSeleccionadas: React.Dispatch<React.SetStateAction<Cuota[]>>;
  cuotasSeleccionadas: Cuota[];
}


function TablaCuotas({ refresh, setCuotasSeleccionadas, cuotasSeleccionadas }: TablaCuotasProps) {

    const [cuotas, setCuotas] = useState<any[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //   // handleCheckboxChange(); // Llamar a la función cuando refresh cambie
    //   if (refresh) {
    //     window.location.reload();
    //   }
    // }, [refresh]);

    useEffect(() => {
      const getCuotas = async () => {
          setLoading(true);
          try {
              const cuotas = await FetchGetCuotas();
              const sortedCuotas = cuotas.sort((a: Cuota, b: Cuota) => parseInt(a.numero) - parseInt(b.numero));      // Si cambia el numero de cuota no olvidar cambiar aca
              setCuotas(sortedCuotas);
          } catch (error) {
              console.error('Error:', error);
          } finally {
              setLoading(false);
          }
      };
      getCuotas();
  }, [refresh]);
   
    const handleCheckboxChange = (cuota: Cuota) => {
      setCuotasSeleccionadas((prevSeleccionadas) => {
          const cuotaIndex = cuotas.indexOf(cuota);
          if (prevSeleccionadas.includes(cuota)) {
            return prevSeleccionadas.filter((item) => cuotas.indexOf(item) < cuotaIndex);
          } else {
              return [...prevSeleccionadas, cuota];
          }
      });
      
    };

    const CuotasInformadas = cuotas.filter((cuota) => cuota.estado === "Pagada completamente");

    const CompararFechas = (fechaVencimiento: string): boolean => {
      const fechaActual = new Date();
      const fechaVenc = new Date(fechaVencimiento);
      console.log('Comparando fechas');
      console.log(fechaVenc);
      console.log(fechaActual);
      return fechaActual > fechaVenc;
    };

    return (
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
            {loading ? (
                    <Skeleton height="400px" w="750px" />
                ) : (
             cuotas.length > 0 ? (
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
                          <motion.tr
                          key={index}
                          animate={{
                            //opacity: CompararFechas(cuota.fechaVencimiento) ? [1, 0.5, 1] : 1,
                            backgroundColor: CompararFechas(cuota.fechaVencimiento) ? ['#FFFFFF', '#FFAAAA', '#FF8A8A'] : 'transparent',
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                        >
                        { CuotasInformadas.includes(cuota) ?
                        <Td><Checkbox isDisabled={true}></Checkbox></Td>
                        :
                        <Td><Checkbox
                        p={0}
                        borderColor={CompararFechas(cuota.fechaVencimiento) ? 'red' : 'green'}
                        colorScheme={CompararFechas(cuota.fechaVencimiento) ? 'red' : 'green'}
                        isChecked={cuotasSeleccionadas.includes(cuota)}
                        isDisabled={cuotas.slice(0, index).filter(item => !CuotasInformadas.includes(item)).some((prevCuota) => !cuotasSeleccionadas.includes(prevCuota))}
                        onChange={() => handleCheckboxChange(cuota)}
                        >
                        </Checkbox></Td>
                        }
                        <Td textAlign="center" p={1}>{cuota.numero}</Td>
                        <Td textAlign="center">{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Td>
                        <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format( cuota.montoActual)}</Td>
                        <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format( cuota.valorpagado)}</Td>
                        <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format( cuota.valorinformado)}</Td>
                        { cuota.estado !== "Pagada" ?
                        <Td textAlign="center">{"$ " +  new Intl.NumberFormat('es-ES').format((cuota.montoActual - cuota.valorpagado - cuota.valorinformado))}</Td>
                        : 
                        <Td textAlign="center">{"$ " + 0}</Td>
                        }
                     </motion.tr>
                    ))}
                  </Tbody>
                </Table>
            ) : (
              <Text>No hay cuotas para mostrar. Por favor, firmar el compromiso de pago.</Text>
            )
            )}
          
        </Box>
        </Flex>
    );
    }

export default TablaCuotas;