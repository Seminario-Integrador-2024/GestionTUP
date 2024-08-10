import { Flex, Image, MenuButton, Menu, MenuList, MenuItem, Button } from "@chakra-ui/react";
import imgLogo from "../icons/Logos TUP_Mesa de trabajo 1.png"
import logoUser from "../icons/logo-user.png"

export function HeaderContent(){
    return (
        <Flex
            borderBottom="1px"
            borderColor='gray.300'
            w='100%'
            pos="fixed"
            pl='30px'
            pr='30px'
            justifyContent='space-between'
            textAlign='center'
            zIndex='2'
            background='white'
            alignItems='center'
        > 
            <Menu >
                <Image src={imgLogo} w='80px'></Image>
                <MenuButton  as={Button} borderRadius='50%' w='50px' h='50px' p='0px' >
                  <Image src={logoUser} w='100%'></Image>
                </MenuButton>
                <MenuList>
                    <MenuItem>Ver Perfil</MenuItem>
                    <MenuItem>Cerrar sesión</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}