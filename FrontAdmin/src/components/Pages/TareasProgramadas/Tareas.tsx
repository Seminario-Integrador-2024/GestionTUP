import { actualizarinhabilitaciones, actualizarmaterias, actualizarpagos, actualizarcuotas } from "../../../API/TareasProgramadas";
import { useEffect, useState } from "react";
import {Flex, Box, Button, Heading, Text, useDisclosure, Alert, Spinner} from '@chakra-ui/react';
import ModalComponent from "../../Modal/ModalConfirmarCambios";
import { useToast } from "../../Toast/useToast";
import { CiPlay1 } from "react-icons/ci";

function Tareas() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
  const {isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3} = useDisclosure();
  const {isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4} = useDisclosure();
  const {isOpen: isOpen5, onOpen: onOpen5, onClose: onClose5} = useDisclosure();
  const toast = useToast();
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [loadingInhabilitaciones, setLoadingInhabilitaciones] = useState(false);
  const [loadingMaterias, setLoadingMaterias] = useState(false);
  const [loadingCuotas, setLoadingCuotas] = useState(false);

  const handleconfirmarpagos = async() => {
    setLoadingPagos(true);
    try {
      const response = await actualizarpagos();
      onClose();
      toast('Exito', `${response[0].mensaje}`, 'success');
    } catch (error) {
      toast('Error', 'Proceso no ejecutado', 'error');
    }
    setLoadingPagos(false);
  }

  const handleactualizarmaterias = async() => {
    setLoadingMaterias(true);
    try {
      const response = await actualizarmaterias();
      onClose3();
      toast('Exito', `${response[0].mensaje}`, 'success');
    } catch (error) {
      toast('Error', 'Proceso no ejecutado', 'error');
    }
    setLoadingMaterias(false);
  }

    const handleactualizarinhabilitaciones = async() => {
    setLoadingInhabilitaciones(true);
    try {
      const response = await actualizarinhabilitaciones();
      onClose2();
      toast('Exito', `${response[0].mensaje}`, 'success');
    } catch (error) {
      toast('Error', 'Proceso no ejecutado', 'error');
    }
    setLoadingInhabilitaciones(false);
    }

    const handleactualizarcuotas = async() => {
    setLoadingCuotas(true);
    try {
        const response = await actualizarcuotas();
        onClose4();
        toast('Exito', `${response[0].mensaje}`, 'success');
    } catch (error) {
      toast('Error', 'Proceso no ejecutado', 'error');
    }
    setLoadingCuotas(false);
    }

    const handleejecutartodos = async() => {
      setLoadingCuotas(true);
      setLoadingInhabilitaciones(true);
      setLoadingMaterias(true);
      setLoadingPagos(true);
        try {
            await actualizarpagos();
            await actualizarinhabilitaciones();
            await actualizarmaterias();
            await actualizarcuotas();
            onClose5();
            toast('Exito', `Todos los procesos fueron ejecutados correctamente`, 'success');
          } catch (error) {
            toast('Error', 'Proceso no ejecutado', 'error');
          }
          setLoadingCuotas(false);
          setLoadingInhabilitaciones(false);
          setLoadingMaterias(false);
          setLoadingPagos(false);
    }

  return (
    <div>
        <Flex justifyContent={'center'} mt={5}>
            <Button leftIcon={<CiPlay1/>} variant={'solid'} onClick={onOpen5} color='white'>Ejecutar Todos</Button>
        </Flex>
        <Flex direction={'column'} gap={5} mt={5}>
            <Box 
            bg={'secundaryBg'}
            borderRadius={5}
            p={5}
            gap={4}>
                <Heading fontSize={22} mb={2}>Actualizar Pagos</Heading>
                
                <ul>
                 <Text ml={5}><li> <strong>Función:</strong> Encargado de imputar los pagos confirmados de cada alumno</li></Text>
                 <Text ml={5}><li> <strong>Ejecución automática:</strong> Anual del 1 de Marzo al 31 de Diciembre a las 23:00 hs </li></Text>
                </ul>
                <Flex mt={2} justifyContent={'flex-end'}>
                <Button onClick={onOpen} variant={'light'}>{loadingPagos ? <Spinner size="sm" /> : 'Ejecutar ahora'}</Button>
                </Flex>
            </Box>
            <Box
            bg={'secundaryBg'}
            borderRadius={5}
            p={5}
            gap={4}>
                <Heading fontSize={22} mb={2}>Actualizar Inhabilitaciones</Heading>
                <ul>
                 <Text ml={5}><li> <strong>Función:</strong> Encargado de actualizar las inhabilitaciones registradas de cada alumno</li></Text>
                 <Text ml={5}><li> <strong>Ejecución automática:</strong> Anual del 1 de Marzo al 31 de Diciembre a las 00:00 hs </li></Text>
                </ul>
                <Flex mt={2} justifyContent={'flex-end'}>
                <Button onClick={onOpen2} variant={'light'}>{loadingInhabilitaciones ? <Spinner size="sm" /> : 'Ejecutar ahora' }</Button>
                </Flex>
            </Box>
            <Box
            bg={'secundaryBg'}
            borderRadius={5}
            p={5}
            gap={4}
            >
                <Heading fontSize={22} mb={2}>Actualizar Materias</Heading>
                <ul>
                 <Text ml={5}><li> <strong>Función:</strong> Encargado de actualizar las materiasque cursa actualmente cada alumno</li></Text>
                 <Text ml={5}><li> <strong>Ejecución automática:</strong> 1er cuatrimestre del 12 febrero al 6 de marzo a las 00:00 hs 
                    - 2do cuatrimestre del 12 julio al  2 agosto a las 00:00 hs </li></Text>
                </ul>
                <Flex mt={2} justifyContent={'flex-end'}>
                <Button onClick={onOpen3} variant={'light'}>{loadingMaterias ? <Spinner size="sm" /> : 'Ejecutar ahora'}</Button>
                </Flex>
            </Box>
            <Box
           bg={'secundaryBg'}
            borderRadius={5}
            p={5}
            gap={4}
            >
                <Heading fontSize={22} mb={2}>Actualizar Cuotas</Heading>
                <ul>
                 <Text ml={5}><li> <strong>Función:</strong> Encargado de actualizar el monto de las cuotas según el vencimiento</li></Text>
                 <Text ml={5}><li> <strong>Ejecución automática:</strong> Anual del 1 de Marzo al 31 de Diciembre a las 23:59 hs </li></Text>
                </ul>
                <Flex mt={2} justifyContent={'flex-end'}>
                <Button onClick={onOpen4} variant={'light'}>{loadingCuotas ? <Spinner size="sm" /> : 'Ejecutar ahora'}</Button>
                </Flex>
            </Box>
        </Flex>
        <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        texto={'¿Está seguro que desea ejecutar este proceso?'}
        confirmar={handleconfirmarpagos}
        />
        <ModalComponent
        isOpen={isOpen2}
        onClose={onClose2}
        texto={'¿Está seguro que desea ejecutar este proceso?'}
        confirmar={handleactualizarinhabilitaciones}
        />
        <ModalComponent
        isOpen={isOpen3}
        onClose={onClose3}
        texto={'¿Está seguro que desea ejecutar este proceso?'}
        confirmar={handleactualizarmaterias}
        />
        <ModalComponent
        isOpen={isOpen4}
        onClose={onClose4}
        texto={'¿Está seguro que desea ejecutar este proceso?'}
        confirmar={handleactualizarcuotas}
        />
        <ModalComponent
        isOpen={isOpen5}
        onClose={onClose5}
        texto={'¿Está seguro que desea ejecutar todos los procesos?'}
        confirmar={handleejecutartodos}
        />
    </div>
  );
}

export default Tareas