import { Box, Flex, Menu, MenuButton, MenuItem, Button, MenuList, Heading, Stack} from "@chakra-ui/react";

interface CardCargaProps {
    texto: string;
}

export default function CardCarga({ texto }: CardCargaProps) {

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
                <MenuItem >Ver Ultimo Archivo</MenuItem>
                <MenuItem >Cargar Archivo</MenuItem>
            </MenuList>
        </Menu>
        </Stack>
    </Box>
);
}