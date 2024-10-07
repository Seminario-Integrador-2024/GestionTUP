import React from "react";
import TablaCuotas from "./TablaPagos";
import { Flex, Button, Text, Stack, Card, CardBody, Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import {AttachmentIcon} from '@chakra-ui/icons';
import DrawerInformar from "./DrawerPago";
import {obtenerFechaDeHoy} from '../../../utils/general';

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

function InformarPago() {
    const {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
    } = useDisclosure();

    
    const [fechaDeHoy, setFechaDeHoy] = React.useState(obtenerFechaDeHoy());
    const [refresh, setRefresh] = useState(false); 
    const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<Cuota[]>([]);

    const handleRefresh = () => {
        setRefresh(!refresh); 
    };

    useEffect(() => {
        console.log("refresh", refresh);
    }, [refresh]);

    return (


        <Stack
            display={["none", "none", "flex", "flex"]}
            justifyContent="center"
            alignItems="center"
            direction="column"
            w="100%"
            bg="white"
            mt={12}
        >
                <Box>
                <Text textAlign={"left"} mb={2} w={"100%"} color="gray.700">Selecciona las cuotas que deseas informar</Text>
                <TablaCuotas refresh={refresh} setCuotasSeleccionadas={setCuotasSeleccionadas} cuotasSeleccionadas={cuotasSeleccionadas}/>
                </Box>
                <Flex mt={2} w="100%" justifyContent="flex-end">
                <Button color="white" 
                 rightIcon={<AttachmentIcon/>} 
                 onClick={onOpen}
                 >Informar Pago</Button>
                </Flex>
                <DrawerInformar isOpen={isOpen} onClose={onClose} cuotasseleccionadas={cuotasSeleccionadas} onRefresh={handleRefresh}/>
        </Stack>
    );
}

export default InformarPago;