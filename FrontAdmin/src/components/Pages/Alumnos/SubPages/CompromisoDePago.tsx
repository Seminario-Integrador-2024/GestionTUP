import React from "react";
import {
    Container,
    Box,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Flex,
    Link,
    TableContainer,
    Icon,
    Button
} from '@chakra-ui/react';
import { DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import { MdPerson } from 'react-icons/md'; // Importa el ícono de usuario

export default function CompromisoDePago() {
    return (
        <Container maxW="container.xl" p={5}>
            {/* Navbar superior centrado */}
            <Flex
                mb={5}
                align="center"
                justify="center"
                borderBottom="1px"
                borderColor="black"
                p={3}
                bg="white"
            >
                <Link href="#" mx={3} fontWeight="bold">Estado de Cuenta</Link>
                <Link href="#" mx={3} fontWeight="bold">Informar Pago/s</Link>
                <Link href="#" mx={3} fontWeight="bold">Compromiso de Pago</Link>
                <Link href="#" mx={3} fontWeight="bold">Darse de Baja</Link>
            </Flex>

            <Flex mb={5}>
                {/* Información en la parte izquierda */}
                <Box flex="1" mr={3}>
                    <VStack align="start" spacing={4}>
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                            <Icon as={MdPerson} boxSize={36} color="black" border="2px" borderColor="black" borderRadius="full" mb={2} /> {/* Icono de usuario */}
                            <Text fontWeight="bold" fontSize="md">Nombre del alumno</Text>
                        </Box>
                        <Text fontWeight="bold" fontSize="sm">
                            Cuota:
                            <Text as="span" display="block" color="#343434">Completa</Text>
                        </Text>
                        <Text fontWeight="bold" fontSize="sm">
                            Compromiso de Pago:
                            <Text as="span" display="block" color="#343434">Firmado (15/02/2024 14:52 hs)</Text>
                        </Text>
                        <Text fontWeight="bold" fontSize="sm">
                            Situación:
                            <Text as="span" display="block" color="#343434">Habilitado</Text>
                        </Text>
                        <Text fontWeight="bold" fontSize="sm">
                            Deuda:
                            <Text as="span" display="block" color="#343434">$-</Text>
                        </Text>
                        <Text fontWeight="bold" fontSize="sm">
                            Próximo Vencimiento:
                            <Text as="span" display="block" color="#343434">10/06/2024</Text>
                        </Text>
                    </VStack>
                </Box>

                {/* Tabla en el medio */}
                <Box flex="2" width="555px" height="300px" maxW="555px" overflow="hidden" mr={52}>
                    <Text color="red.500" fontWeight="bold" mb={2} fontSize="sm">
                        El compromiso de pago ya se encuentra firmado (15/02/2024 14:52 hs)
                    </Text>
                    <TableContainer
                        border="2px"
                        borderColor="#BABABA" // Borde gris claro para la tabla
                        borderRadius="md"
                        overflow="auto"
                        width="100%"
                        height="100%"
                    >
                        <Table variant="unstyled" size="sm">
                            <Thead>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Th textAlign="center" fontWeight="bold" width="120px" borderBottom="1px" borderColor="#BABABA">Fecha</Th>
                                    <Th textAlign="center" fontWeight="bold" width="120px" borderBottom="1px" borderColor="#BABABA">Descargar</Th>
                                    <Th textAlign="center" fontWeight="bold" width="120px" borderBottom="1px" borderColor="#BABABA">Ver</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">15/02/2024</Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Descargar"
                                            icon={<DownloadIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Descargar PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Ver PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                </Tr>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">02/08/2023</Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Descargar"
                                            icon={<DownloadIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Descargar PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Ver PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                </Tr>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">15/02/2023</Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Descargar"
                                            icon={<DownloadIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Descargar PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Ver PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                </Tr>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">11/08/2022</Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Descargar"
                                            icon={<DownloadIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Descargar PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Ver PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                </Tr>
                                <Tr borderBottom="1px" borderColor="#BABABA">
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">02/02/2022</Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Descargar"
                                            icon={<DownloadIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Descargar PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                    <Td textAlign="center" width="120px" whiteSpace="nowrap">
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            variant="outline"
                                            onClick={() => console.log('Ver PDF')}
                                            bg="none"
                                            size="sm"
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>

            {/* PDF del compromiso de pago */}
            <Flex justify="center" ml={64} mt={5}>
                <Box
                    border="1px"
                    borderColor="gray.200"
                    p={4}
                    borderRadius="md"
                    overflow="hidden"
                    width="555px"
                    height="310px"
                    maxH="310px"
                >
                    <iframe
                        src="/compromiso_de_pago_2023.pdf"
                        width="100%"
                        height="100%"
                        title="Compromiso de Pago"
                    />
                </Box>
            </Flex>

            {/* Botón "Firmar" centrado */}
            <Flex justify="center" ml={64} mt={4}>
                <Button colorScheme="teal">Firmar</Button>
            </Flex>
        </Container>
    );
}
