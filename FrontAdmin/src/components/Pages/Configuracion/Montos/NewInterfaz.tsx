import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { deleteCompromiso } from '../../../../API/Montos';
import ModalComponent from '../../../Modal/ModalConfirmarCambios'; 
interface Compromiso {
  anio: string | number | Date;
  fecha_carga_comp_pdf: string;
  cuatrimestre: string;
  archivo_pdf_url: string;
  id_comp_pago: number;
  matricula: number;
  monto_completo: number;
  monto_completo_2venc: number;
  monto_completo_3venc: number;
  cuota_reducida: number;
  cuota_reducida_2venc: number;
  cuota_reducida_3venc: number;
  fecha_vencimiento_1: number;
  fecha_vencimiento_2: number;
  fecha_vencimiento_3: number;
}

interface CardCargaProps {
  compromisos: Compromiso[];
  fetchMontos: () => void;
}

const NewInterfaz = ({ compromisos, fetchMontos }: CardCargaProps) => {
  const [montos, setMontos] = useState<Compromiso[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure(); // Estado para el modal de confirmación
  const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para la eliminación

  useEffect(() => {
    const sortedMontos = [...compromisos].sort((a, b) => {
      const dateA = new Date(a.fecha_carga_comp_pdf);
      const dateB = new Date(b.fecha_carga_comp_pdf);
      return dateB.getTime() - dateA.getTime();
    });
    console.log('Montos ordenados:', sortedMontos);
    setMontos(sortedMontos);
  }, [compromisos]);

  const handleViewPdf = async (url: string) => {
    try {
      const token = Cookies.get('tokennn');
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Buscando PDF en: ', url);
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      onOpen();
    } catch (error) {
      console.error('Error al obtener el PDF:', error);
    }
  };

  const handleCloseModal = () => {
    setPdfUrl(null);
    onClose();
  };

  const handleDeleteLastCompromiso = async () => {
    if (montos.length === 0) return;

    const lastCompromiso = montos[0];
    try {
      setIsDeleting(true);
      await deleteCompromiso(lastCompromiso.id_comp_pago);
    fetchMontos();
      onConfirmClose(); 
    } catch (error) {
      console.error('Error al eliminar el compromiso:', error);
    } finally {
      fetchMontos();
      onConfirmClose();
      setIsDeleting(false);
    }
  };

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
      overflowX="auto"
    >
      <SimpleGrid mt="15px">
        {montos.length > 0 ? (
          <Table variant="striped" colorScheme="gray.700">
            <Thead>
              <Tr>
                <Th p={1}>Año/ Cuatrimestre</Th>
                <Th p={2}>Matrícula</Th>
                <Th p={2}>Montos</Th>
                <Th p={1}>Dia de vencimiento</Th>
                <Th p={1}>Fecha Ult Modif.</Th>
                <Th p={1}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {montos.map((monto, index) => (
                <Tr key={index}>
                  <Td p={1}>
                    {new Date(monto.anio).getFullYear() +
                      ' / ' +
                      monto.cuatrimestre}
                  </Td>
                  <Td p={2}>{' $ ' + monto.matricula}</Td>
                  <Td p={2}>
                    <Box>
                      <Text fontWeight="bold">Monto Completo: {' $ ' + monto.monto_completo}</Text>
                      <Text fontSize="sm">2do Vencimiento: {' $ ' + monto.monto_completo_2venc}</Text>
                      <Text fontSize="sm">3er Vencimiento: {' $ ' + monto.monto_completo_3venc}</Text>
                      <Text fontWeight="bold" mt={2}>Cuota Reducida: {' $ ' + monto.cuota_reducida}</Text>
                      <Text fontSize="sm">2do Vencimiento: {' $ ' + monto.cuota_reducida_2venc}</Text>
                      <Text fontSize="sm">3er Vencimiento: {' $ ' + monto.cuota_reducida_3venc}</Text>
                    </Box>
                  </Td>
                  <Td p={1}>
                    <Text>
                      1er Vencimiento: <Box as="span" fontWeight="bold" color="black">{monto.fecha_vencimiento_1}</Box>
                    </Text>
                    <Text>
                      2do Vencimiento: <Box as="span" fontWeight="bold" color="black">{monto.fecha_vencimiento_2}</Box>
                    </Text>
                    <Text>
                      3er Vencimiento: <Box as="span" fontWeight="bold" color="black">{monto.fecha_vencimiento_3}</Box>
                    </Text>
                  </Td>
                  <Td p={1}>
                    {new Date(monto.fecha_carga_comp_pdf).toLocaleString(
                      'es-ES',
                      { dateStyle: 'short', timeStyle: 'short' }
                    )}
                  </Td>
                  <Td p={1}>
                    <Flex direction="column" gap={2}>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleViewPdf(monto.archivo_pdf_url)}
                      >
                        Ver pdf
                      </Button>
                      {index === 0 && (
                        <Button colorScheme="red" onClick={onConfirmOpen} isLoading={isDeleting}>
                          Eliminar
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent maxW="80%" mt="10px">
          <ModalHeader>PDF</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalComponent
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        texto="¿Está seguro de que desea eliminar el último compromiso cargado?"
        confirmar={handleDeleteLastCompromiso}
      />
    </Box>
  );
};

export default NewInterfaz;
