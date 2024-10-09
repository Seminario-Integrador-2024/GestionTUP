import React, { useEffect } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Text,
    Stack,
    Flex,
    Icon,
  } from '@chakra-ui/react'
import { useState} from 'react'
import {AttachmentIcon, InfoIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import { FetchPostPago } from '../../../API-Alumnos/Pagos';
import Cookies from 'js-cookie';
import {useToast} from '../../Toast/useToast';
import {obtenerFechaForm} from '../../../utils/general';

interface Cuota {
    id_cuota: number;
    numero: string;
    monto1erVencimiento: number;
    monto2doVencimiento: number;
    monto3erVencimiento: number;
    valortotal: number;
    valorpagado: number;
    valoradeudado: number;
    estado: string;
  }

interface DrawerInformarProps {
    isOpen: boolean;
    onClose: () => void;
    cuotasseleccionadas: Cuota[];
    onRefresh?: () => void;
}

const DrawerInformar: React.FC<DrawerInformarProps> = ({ isOpen, onClose, cuotasseleccionadas, onRefresh }) => {
    const [montoAbonado, setMontoAbonado] = useState<number>(0); 
    const [comentarios, setComentarios] = useState('');
    const [total, setTotal] = useState<number>(0);
    const showToast = useToast();

    const obtenerMesesDeCuotas = (numerosCuotas: number[]): string[] => {
      const meses: { [key: number]: string } = {
          0: 'Matrícula',
          1: 'Marzo',
          2: 'Abril',
          3: 'Mayo',
          4: 'Junio',
          5: 'Julio',
          6: 'Agosto',
          7: 'Septiembre',
          8: 'Octubre',
          9: 'Noviembre'
      };
  
      return numerosCuotas.map(numero => meses[numero] || 'Mes desconocido');
  };


    const handleSave = () => {
       // Aca hay que hacer el post al backend
       const guardar = async () => {
       try{
            let numerosCuotas = cuotasseleccionadas.map(cuota => cuota.id_cuota);
            numerosCuotas = numerosCuotas.sort((a, b) => a - b); // Ordenar de menor a mayor
            const response = await FetchPostPago(numerosCuotas, montoAbonado, comentarios);

            showToast('Pago informado', 'El pago se ha informado correctamente, continuar en el google forms', 'success');

           const dni = Cookies.get('dni');
           const fullName = Cookies.get('full_name');
           const fechaHoy = obtenerFechaForm();
           const googleFormUrl =  `https://docs.google.com/forms/d/e/1FAIpQLSfNe4krjpaC7I_9FA7Do3MAuQr7eC9wF5zVHIgOV2XeqzAAnA/viewform?usp=pp_url&entry.1045781291=${fullName}&entry.839337160=Tecnicatura+Universitaria+en+Programaci%C3%B3n&entry.1065046570=${dni}&entry.1651003915=${encodeURIComponent(fechaHoy)}&entry.180139663=${obtenerMesesDeCuotas(numerosCuotas)}&entry.463277821=${comentarios}`;
           window.open(googleFormUrl, '_blank');
           
           //onRefresh();
       } catch (error) {
           console.error('Error:', error);
            showToast('Error', 'Ha ocurrido un error al informar el pago', 'error');
            // onRefresh();
       } finally {
          if (onRefresh) {
          onRefresh()};
       }
      };
    guardar();
    onClose();
    };

    const handleCancel = () => {
        onClose();
    }

    const isFormValid = () => {
      return (montoAbonado > 0 && montoAbonado <= total);
    };

    
    useEffect(() => {
      const calculatedTotal = cuotasseleccionadas.reduce((acc, cuota) => acc + (cuota.montoActual - cuota.valorpagado - cuota.valorinformado), 0);
      setTotal(calculatedTotal);
      setMontoAbonado(calculatedTotal); // Inicializa montoAbonado con el valor de total
  }, [isOpen, cuotasseleccionadas]);

  const handleMontoAbonadoChange = (e: any) => {
    const value = e.target.value;
    setMontoAbonado(value === '' ? 0 : parseFloat(value));
  };

  
    // useEffect(() => {
    //   setMontoAbonado(total);
    // }, [total]);

    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Informa tu pago</DrawerHeader>
  
            <DrawerBody>
            <Stack direction="column">
                <Text fontWeight="normal">Cuotas seleccionadas:</Text> 
                {cuotasseleccionadas.map((cuota, index) => (
                    <Flex key={index} ml={1}><li>{cuota.numero}</li> </Flex>
                ))}
            </Stack>
            <Text mt={4}>Total a abonar:</Text>
            <Text mb={4} mt={4} fontWeight={600} textAlign={"center"} fontSize={22}>{"$" + new Intl.NumberFormat('es-ES').format(total)}</Text>
          
            <FormControl isRequired={true}>
                <FormLabel mb={0}>Monto Abonado</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                      $
                    </InputLeftElement>
                    <Input placeholder='' value={montoAbonado} onChange={handleMontoAbonadoChange} />
                </InputGroup>
            
            </FormControl>
            <Stack gap={0}>
              <FormLabel mt={4} mb={0}>Comentarios</FormLabel>
              <Input placeholder='' mt={0}  onChange={(e) => setComentarios(e.target.value)} />
            </Stack>
            <Stack bg={'secundaryBg'} direction={'row'} alignItems={'center'} borderRadius={5} mt={4} mb={4} p={4} gap={4}>
                <Icon as={InfoOutlineIcon} w={7} h={7} />
                <Text as={'i'}>Al seleccionar Guardar se lo redirigira al google forms para que pueda continuar con el informe del pago</Text>
            </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='light' mr={3} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button colorScheme='blue' onClick={handleSave} isDisabled={!isFormValid()}>Guardar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default DrawerInformar;