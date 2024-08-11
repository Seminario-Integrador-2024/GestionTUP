import { Box, Flex, Menu, MenuButton, MenuItem, Button, MenuList, Heading, Stack, useDisclosure} from "@chakra-ui/react";
import ModalVerDocumento from "./Modal";

interface CardCargaProps {
    texto: string;
}

export default function CardCarga({ texto }: CardCargaProps) {

const { isOpen, onOpen, onClose } = useDisclosure();

return (
    <Box
        bg="#f1f1c5"
        borderRadius="10px"
        w="50%"
        // marginLeft="10px" 
        p="15px"
        minHeight={5}
    >
        <Stack direction="column" spacing={2} align="left" marginLeft= "20px" mb="10px" mt="10px">
        <Heading 
            fontSize= "23px"
            fontWeight="bold" 
        >
            {texto}
        </Heading>
        <Menu>
            <MenuButton as={Button} w="25%" color="white" colorScheme="">
                Opciones
            </MenuButton>
            <MenuList>
                <MenuItem onClick={onOpen} >Ver Ultimo Archivo</MenuItem>
                <MenuItem  >Cargar Archivo</MenuItem>
            </MenuList>
        </Menu>

        <ModalVerDocumento isOpen={isOpen} onClose={onClose} titleModal={texto}/>
        </Stack>
    </Box>
);
}