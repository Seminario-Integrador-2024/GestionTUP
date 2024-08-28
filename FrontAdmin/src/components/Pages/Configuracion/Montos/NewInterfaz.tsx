import {
  Box,
  Flex,
  Text,
  Input,
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
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';

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
}

interface CardCargaProps {
  compromisos: Compromiso[];
}

const NewInterfaz = ({ compromisos }: CardCargaProps) => {
  const [montos, setMontos] = useState<Compromiso[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const sortedMontos = [...compromisos].sort((a, b) => {
      const dateA = new Date(a.fecha_carga_comp_pdf);
      const dateB = new Date(b.fecha_carga_comp_pdf);
      return dateB.getTime() - dateA.getTime(); 
    });
    setMontos(sortedMontos);
  }, [compromisos]);

  const handleViewPdf = async (url: string) => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Buscando PDF en: ", url);
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th p={1}>Año/ Cuatrimestre</Th>
                <Th p={2}>Matrícula</Th>
                <Th p={1}>Monto Completo</Th>
                <Th p={1}>Monto Completo 2 Venc</Th>
                <Th p={1}>Monto Completo 3 Venc</Th>
                <Th p={1}>Cuota Reducida</Th>
                <Th p={1}>Cuota Reducida 2 Venc</Th>
                <Th p={1}>Cuota Reducida 3 Venc</Th>
                <Th p={1}>Fecha Ult Modif.</Th>
                <Th p={1}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {montos.map((monto, index) => (
                <Tr key={index}>
                  <Td p={1}>{new Date(monto.anio).getFullYear() + " / " + monto.cuatrimestre}</Td>
                  <Td p={2}>{" $ " + monto.matricula}</Td>
                  <Td p={1}>{" $ " + monto.monto_completo}</Td>
                  <Td p={1}>{" $ " + monto.monto_completo_2venc}</Td>
                  <Td p={1}>{" $ " + monto.monto_completo_3venc}</Td>
                  <Td p={1}>{" $ " + monto.cuota_reducida}</Td>
                  <Td p={1}>{" $ " + monto.cuota_reducida_2venc}</Td>
                  <Td p={1}>{" $ " + monto.cuota_reducida_3venc}</Td>
                  <Td p={1}>
                    {new Date(monto.fecha_carga_comp_pdf).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                  </Td>
                  <Td p={1}>
                    <Button colorScheme="blue" onClick={() => handleViewPdf(monto.archivo_pdf_url)}>
                      Ver pdf
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
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent maxW="80%"  mt='10px'>
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
    </Box>
  );
};

export default NewInterfaz;
  