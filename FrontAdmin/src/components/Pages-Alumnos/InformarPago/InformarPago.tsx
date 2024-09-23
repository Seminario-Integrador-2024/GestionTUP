import React from "react";
import TablaCuotas from "./TablaPagos";
import { Flex, Button, Text, Stack, Card, CardBody } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {AttachmentIcon} from '@chakra-ui/icons';
import DrawerInformar from "./DrawerPago";
import {obtenerFechaDeHoy} from '../../../utils/general';

function InformarPago() {
    const {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
    } = useDisclosure();

    const { jsx: tablaCuotasJSX, cuotasSeleccionadas } = TablaCuotas();
    const [fechaDeHoy, setFechaDeHoy] = React.useState(obtenerFechaDeHoy());

    return (


        <Stack
            alignItems="center"
            direction="column"
            w="100%"
            bg="white"
        >
             <Card>
                    <CardBody>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <Text> Estado de cuenta al:</Text>
                            <Text fontWeight="bold"> {fechaDeHoy} </Text>
                        </Flex>
                    </CardBody>
                </Card>
                {tablaCuotasJSX}
                <Flex mt={2} w="100%" justifyContent="flex-end">
                <Button color="white" 
                 rightIcon={<AttachmentIcon/>} 
                 onClick={onOpen}
                 >Informar Pago</Button>
                </Flex>
                <DrawerInformar isOpen={isOpen} onClose={onClose} cuotasseleccionadas={cuotasSeleccionadas}/>
        </Stack>
    );
}

export default InformarPago;