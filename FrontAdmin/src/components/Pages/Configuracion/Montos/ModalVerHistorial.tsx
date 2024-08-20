import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FetchMontos } from '../../../../API/Montos';
import { CloseIcon } from '@chakra-ui/icons';
import Cookies from 'js-cookie';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerHistorial({
  isOpen,
  onClose,
}: ModalComponentProps) {
  const [montos, setMontos] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filteredMontos, setFilteredMontos] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        const data = await FetchMontos();
        setMontos(data);
      };
      fetchData();
    }
  }, [isOpen]);

  const handleViewPdf = async (url: string) => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error al obtener el PDF:', error);
    }
  };

  const handleFilter = () => {
    const filteredMontos = montos.filter((monto) => {
      const fecha = new Date(monto.fecha_carga_comp_pdf);
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      return fecha >= start && fecha <= end;
    });
    setMontos(filteredMontos);
    setFilteredMontos(true);
  };

  const handleClearFilter = async () => {
    const data = await FetchMontos();
    setMontos(data);
    setStartDate('');
    setEndDate('');
    setFilteredMontos(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent maxWidth="100vw" maxHeight="100vh">
        <ModalHeader>Historial</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="600px" />
          ) : (
            <>
              <Flex mb={4}>
                <Input
                  type="date"
                  placeholder="Fecha de inicio"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  mr={2}
                />
                <Input
                  type="date"
                  placeholder="Fecha de fin"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  mr={2}
                />
                <Button colorScheme="blue" onClick={filteredMontos? handleClearFilter: handleFilter} mr={2} width="150px">
                  {filteredMontos? <CloseIcon /> : "Filtrar"}  
                </Button>
              </Flex>
              {montos.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Cuatrimestre</Th>
                      <Th>Matrícula</Th>
                      <Th>Monto Completo</Th>
                      <Th>Monto Completo 2 Venc</Th>
                      <Th>Monto Completo 3 Venc</Th>
                      <Th>Cuota Reducida</Th>
                      <Th>Cuota Reducida 2 Venc</Th>
                      <Th>Cuota Reducida 3 Venc</Th>
                      <Th>Fecha Carga Comp PDF</Th>
                      <Th>Acciones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {montos.map((monto, index) => (
                      <Tr key={index}>
                        <Td>{monto.cuatrimestre}</Td>
                        <Td>{monto.matricula}</Td>
                        <Td>{monto.monto_completo}</Td>
                        <Td>{monto.monto_completo_2venc}</Td>
                        <Td>{monto.monto_completo_3venc}</Td>
                        <Td>{monto.cuota_reducida}</Td>
                        <Td>{monto.cuota_reducida_2venc}</Td>
                        <Td>{monto.cuota_reducida_3venc}</Td>
                        <Td>{new Date(monto.fecha_carga_comp_pdf).toLocaleDateString()}</Td>
                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleViewPdf(monto.archivo_pdf_url)}
                          >
                            Ver PDF
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>No hay datos disponibles</Text>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
          {pdfUrl && (
            <Button colorScheme="red" onClick={() => setPdfUrl(null)}>
              Volver
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}