import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Checkbox, Tooltip, Alert, AlertIcon, Spinner, useBreakpointValue } from '@chakra-ui/react'; 
import { useState, useEffect } from 'react';
import { FetchGetCuotas } from '../../../API-Alumnos/Pagos';
import { formatoFechaISOaDDMMAAAA } from '../../../utils/general';
import { motion } from 'framer-motion';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { set } from 'date-fns';

interface Cuota {
  id_cuota: number;
  numero: number;
  montoActual: number;
  fechaVencimiento: string;
  monto_pagado: number;
  estado: string;
  tipocuota: string;
  valorinformado: number;
  cuota_completa: boolean;
}

interface TablaCuotasProps {
  refresh: boolean;
  setCuotasSeleccionadas: React.Dispatch<React.SetStateAction<Cuota[]>>;
  cuotasSeleccionadas: Cuota[];
}



function TablaCuotas({ refresh, setCuotasSeleccionadas, cuotasSeleccionadas }: TablaCuotasProps) {

  const [cuotas, setCuotas] = useState<Cuota[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const getCuotas = async () => {
      setLoading(true);
      try {
         const cuotas = await FetchGetCuotas(undefined);
         const sortedCuotas = cuotas.sort((a: Cuota, b: Cuota) => a.numero - b.numero);
         setCuotas(sortedCuotas);
       
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    getCuotas();
    setCuotasSeleccionadas([]);
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
    return fechaActual > fechaVenc;
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="100%"
    >
      <Box
        borderRadius={8}
        borderColor="gray.200"
        borderStyle="solid"
        borderWidth={1}
        p={3}
        w="100%"
      >
        {loading ? (
          <Flex alignItems="center" justifyContent="center" >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
        ) : (
          cuotas.length > 0 ? (
            isMobile ? (
              cuotas.map((cuota, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  mb={4}
                  bg={CompararFechas(cuota.fechaVencimiento) ? 'red.100' : 'white'}
                >
                  <Flex justifyContent="space-between" mb={2}>
                    <Checkbox
                      isDisabled={CuotasInformadas.includes(cuota)}
                      isChecked={cuotasSeleccionadas.includes(cuota)}
                      onChange={() => handleCheckboxChange(cuota)}
                    />
                    <Text fontWeight="bold">Cuota {cuota.numero}</Text>
                  </Flex>
                  <Text><strong>Fecha Próximo VTO.:</strong> {formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Text>
                  <Text><strong>Valor Actual:</strong> ${new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Text>
                  <Text><strong>Valor Pagado:</strong> ${new Intl.NumberFormat('es-ES').format(cuota.monto_pagado)}</Text>
                  <Text><strong>Valor Informado:</strong> ${new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Text>
                  <Text><strong>Valor Adeudado:</strong> ${new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.monto_pagado - cuota.valorinformado)}</Text>
                </Box>
              ))
            ) : (
              <Table variant="simple" width="100%">
                <Thead>
                  <Tr mt={6}>
                    <Th></Th>
                    <Th textAlign="center" p={1}>Cuota</Th>
                    <Th textAlign="center">Fecha Próximo VTO.</Th>
                    <Th textAlign="center">Valor Actual     
                      <Tooltip ml={'2px'} label="Valor dependiente del vencimiento en que se encuentra" aria-label="A tooltip">
                        <QuestionOutlineIcon boxSize={4} />
                      </Tooltip>
                    </Th>
                    <Th textAlign="center">Valor Pagado
                      <Tooltip label="Valor correspondiente a pagos confirmados por tesorería" aria-label="A tooltip">
                        <QuestionOutlineIcon boxSize={4} />
                      </Tooltip>
                    </Th>
                    <Th textAlign="center">Valor Informado
                      <Tooltip label="Valor correspondiente a pagos sin confirmar por tesorería" aria-label="A tooltip">
                        <QuestionOutlineIcon boxSize={4} />
                      </Tooltip>
                    </Th>
                    <Th textAlign="center">Valor Adeudado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cuotas.map((cuota, index) => (
                    <Tr
                      key={index}
                      bg={CompararFechas(cuota.fechaVencimiento) ? 'red.100' : 'transparent'}
                    >
                      <Td>
                        <Checkbox
                          isDisabled={CuotasInformadas.includes(cuota)}
                          isChecked={cuotasSeleccionadas.includes(cuota)}
                          onChange={() => handleCheckboxChange(cuota)}
                        />
                      </Td>
                      <Td textAlign="center" p={1}>{cuota.numero}</Td>
                      <Td textAlign="center">{formatoFechaISOaDDMMAAAA(cuota.fechaVencimiento)}</Td>
                      <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format(cuota.montoActual)}</Td>
                      <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format(cuota.monto_pagado)}</Td>
                      <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format(cuota.valorinformado)}</Td>
                      <Td textAlign="center">{"$ " + new Intl.NumberFormat('es-ES').format(cuota.montoActual - cuota.monto_pagado - cuota.valorinformado)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )
          ) : (
            <Alert status="info" alignItems="center" justifyContent="center" textAlign="center">
              <AlertIcon mr={1} />
              <Text>
                No hay cuotas para mostrar. Por favor, firmar el compromiso de pago.
              </Text>
            </Alert>
          )
        )}
      </Box>
    </Flex>
  );
}

export default TablaCuotas;