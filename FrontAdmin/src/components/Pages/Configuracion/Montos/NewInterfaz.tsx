import {
    Box,
    Flex,
    Text,
    Input,
    Button,
    SimpleGrid,
    useDisclosure,
    IconButton,
    Tooltip,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
  } from '@chakra-ui/react';
  import { EditIcon } from '@chakra-ui/icons';
  import ModalComponent from '../../../Modal/ModalConfirmarCambios';
  import { useEffect, useState } from 'react';
  import { useToast } from '@chakra-ui/react';
  import VerHistorial from './ModalVerHistorial';
  import { FetchMontos } from '../../../../API/Montos';
  import { formatoFechaISOaDDMMAAAA } from '../../../../utils/general';
  let fechaUltimoPago = "12/08/2024"
  
  interface Compromiso {
    fecha_carga_comp_pdf: string;
    cuatrimestre: string;
    archivo_pdf_url?: string;
    id_comp_pago: number;
    matricula: number;
    monto_completo: number;
    monto_completo_2venc: number;
    monto_completo_3venc: number;
    cuota_reducida: number;
    cuota_reducida_2venc: number;
    cuota_reducida_3venc: number;
  }
  
  interface CardCargaProps {
    compromisos: Compromiso[];
  }
  const MontoInput = ({
    label,
    name,
    value,
    onChange,
    isReadOnly,
  }: {
    label: string;
    name: string;
    value: number;
    onChange: (e: { target: { name: string; value: string } }) => void;
    isReadOnly: boolean;
  }) => (
    <Flex align="center">
      <Text w="60%">{label}</Text>
      <Input
        type="text"
        name={name}
        value={'$' + value}
        onChange={onChange}
        size="sm"
        bg="white"
        readOnly={isReadOnly}
        _readOnly={{
          opacity: 1,
          cursor: 'not-allowed',
          bg: 'gray.50',
          color: 'gray.700',
        }}
      />
    </Flex>
  );
  
  const NewInterfaz = ({  compromisos }: CardCargaProps) => {

    const [montos, setMontos] = useState<any[]>([]);
    const cargarDatosDePrueba = () => {
    const datosDePrueba = [
      {
        cuatrimestre: '2023-1',
        matricula: '12345',
        monto_completo: 1000,
        monto_completo_2venc: 1050,
        monto_completo_3venc: 1100,
        cuota_reducida: 800,
        cuota_reducida_2venc: 850,
        cuota_reducida_3venc: 900,
        fecha_carga_comp_pdf: '2023-01-15',
        archivo_pdf_url: 'https://example.com/pdf1.pdf',
      },
      {
        cuatrimestre: '2023-2',
        matricula: '67890',
        monto_completo: 1200,
        monto_completo_2venc: 1250,
        monto_completo_3venc: 1300,
        cuota_reducida: 900,
        cuota_reducida_2venc: 950,
        cuota_reducida_3venc: 1000,
        fecha_carga_comp_pdf: '2023-02-20',
        archivo_pdf_url: 'https://example.com/pdf2.pdf',
      },

    ];
  
    setMontos(datosDePrueba);
  };

useEffect(() => {
  cargarDatosDePrueba();
}, []);

    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg="secundaryBg"
        p={6}
        boxShadow="md"
        maxW="100%"
        mt={4}
        position="relative"
      >

        <SimpleGrid mt="15px">
        {montos.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th p={1}>Cuatrimestre</Th>
                      <Th p={2}>Matrícula</Th>
                      <Th p={1}>Monto Completo</Th>
                      <Th p={1}>Monto Completo 2 Venc</Th>
                      <Th p={1}>Monto Completo 3 Venc</Th>
                      <Th p={1}>Cuota Reducida</Th>
                      <Th p={1}>Cuota Reducida 2 Venc</Th>
                      <Th p={1}>Cuota Reducida 3 Venc</Th>
                      <Th p={1}>Fecha Ult Modif.</Th>
                      <Th p={1}>Compromiso de Pago</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {montos.map((monto, index) => (
                      <Tr key={index}>
                      <Td p={1}>{monto.cuatrimestre}</Td>
                      <Td p={2}>{monto.matricula}</Td>
                      <Td p={1}>{monto.monto_completo}</Td>
                      <Td p={1}>{monto.monto_completo_2venc}</Td>
                      <Td p={1}>{monto.monto_completo_3venc}</Td>
                      <Td p={1}>{monto.cuota_reducida}</Td>
                      <Td p={1}>{monto.cuota_reducida_2venc}</Td>
                      <Td p={1}>{monto.cuota_reducida_3venc}</Td>
                      <Td p={1}>
                        {new Date(monto.fecha_carga_comp_pdf).toLocaleDateString()}
                      </Td>
                      <Td p={1}>
                        <Button colorScheme="blue">
                          Visualizar
                        </Button>
                      </Td>
                    </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>No hay datos disponibles</Text>
              )}

        </SimpleGrid>
      </Box>
    );
  };
  
  export default NewInterfaz;
  