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
    Alert,
    AlertIcon
  } from '@chakra-ui/react'
import { useState} from 'react'
import {AttachmentIcon, InfoIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import { FetchPostPago } from '../../../API-Alumnos/Pagos';
import Cookies from 'js-cookie';
import {useToast} from '../../Toast/useToast';
import {obtenerFechaForm} from '../../../utils/general';
import { formatoFechaISOaMM } from '../../../utils/general';

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
      console.log('nuemrossss', numerosCuotas)
      const meses: { [key: number]: string } = {
          0: 'Matrícula',
          1: 'Enero',
          2: 'Febrero',
          3: 'Marzo',
          4: 'Abril',
          5: 'Mayo',
          6: 'Junio',
          7: 'Julio',
          8: 'Agosto',
          9: 'Septiembre',
          10: 'Octubre',
          11: 'Noviembre',
          12: 'Diciembre',
      };
  
      return numerosCuotas.map(numero => meses[numero] || 'Mes desconocido');
  };

  console.log('cuotasseleccionadas', cuotasseleccionadas);


    const handleSave = () => {
       const guardar = async () => {
       try{
            let numerosCuotas = cuotasseleccionadas.map(cuota => cuota.id_cuota);
            numerosCuotas = numerosCuotas.sort((a, b) => a - b); // Ordenar de menor a mayor
            const response = await FetchPostPago(numerosCuotas, montoAbonado, comentarios);

            showToast('Pago informado', 'El pago se ha informado correctamente, continuar en el google forms', 'success');

            let mesesCuota = cuotasseleccionadas.map(cuota => formatoFechaISOaMM(cuota.fechaVencimiento));
            mesesCuota = mesesCuota.map((mes, index, self) => self.indexOf(mes) !== index ? 0 : mes);    // Para la matricula
            mesesCuota = mesesCuota.sort((a, b) => a - b); // Ordenar de menor a mayor
           const dni = Cookies.get('dni');
           const fullName = Cookies.get('full_name');
           const cuil = Cookies.get('cuil');
           const fechaHoy = obtenerFechaForm();
           const meses = obtenerMesesDeCuotas(mesesCuota);
           const googleFormUrl =  `https://docs.google.com/forms/d/e/1FAIpQLSfNe4krjpaC7I_9FA7Do3MAuQr7eC9wF5zVHIgOV2XeqzAAnA/viewform?usp=pp_url&entry.1045781291=${fullName}&entry.839337160=Tecnicatura+Universitaria+en+Programaci%C3%B3n&entry.1065046570=${dni}&entry.1166974658=${cuil}&entry.1651003915=${encodeURIComponent(fechaHoy)}&entry.180139663=${meses}&entry.463277821=${comentarios}`;
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
      const calculatedTotal = cuotasseleccionadas.reduce((acc, cuota) => acc + (cuota.montoActual - cuota.valorinformado), 0);
      setTotal(calculatedTotal);
      setMontoAbonado(calculatedTotal);
  }, [isOpen, cuotasseleccionadas]);

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
            <Text mb={1} mt={4} fontWeight={600} textAlign={"center"} fontSize={22}>{"$" + new Intl.NumberFormat('es-ES').format(total)}</Text>
            <Stack gap={0}>
              <FormLabel mt={2} mb={0}>Comentarios</FormLabel>
              <Input placeholder='' mt={0}  onChange={(e) => setComentarios(e.target.value)} />
            </Stack>
            <Alert status='info' mt={4} mb={4}>
              <AlertIcon />
              Al seleccionar Guardar se lo redirigira al google forms para que pueda continuar con el informe del pago. Revisar tener desactivado el bloqueo de ventanas emergentes
            </Alert>
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