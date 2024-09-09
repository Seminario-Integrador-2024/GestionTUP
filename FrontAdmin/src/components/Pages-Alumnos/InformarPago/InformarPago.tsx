import React from "react";
import TablaCuotas from "./TablaPagos";
import { Flex, Button, Text, Stack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {AttachmentIcon} from '@chakra-ui/icons';
import DrawerInformar from "./DrawerPago";

function InformarPago() {
    const {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
    } = useDisclosure();

    return (
        <Stack
            alignItems="center"
            direction="column"
            w="100%"
            bg="white"
        >
                <TablaCuotas />
                <Flex mt={2} w="100%" justifyContent="flex-end">
                <Button color="white" 
                 rightIcon={<AttachmentIcon/>} 
                 onClick={onOpen}
                 >Informar Pago</Button>
                </Flex>
                <DrawerInformar isOpen={isOpen} onClose={onClose}/>
        </Stack>
    );
}

export default InformarPago;