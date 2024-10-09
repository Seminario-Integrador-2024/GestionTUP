import React, { useState } from 'react';
import { Heading, Input, Flex, Button } from '@chakra-ui/react';
import {formatoFechaAAAAMMaMMAAAA} from '../../../../../utils/general';
import { useNavigate } from 'react-router-dom';

export default function Select() {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [fecha, setFecha] = useState('');
    const navigate = useNavigate();

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(event.target.value);
        setFecha(formatoFechaAAAAMMaMMAAAA(event.target.value));

    };

    return (
        <Flex gap={2} direction={"column"}>
            <Heading fontSize={22} mt={6}>Seleccione un mes</Heading>
            <Input
                type="month"
                id="month"
                name="month"
                value={selectedMonth}
                onChange={handleMonthChange}
            />
            <Flex  justifyContent={"flex-end"} mt={1}>
                <Button colorScheme='blue' variant={"solid"}
                 onClick={() => navigate(`/admin/estadisticas/cuotas/${fecha}`)}
                >Solicitar</Button>
            </Flex>
        </Flex>
    );
};
