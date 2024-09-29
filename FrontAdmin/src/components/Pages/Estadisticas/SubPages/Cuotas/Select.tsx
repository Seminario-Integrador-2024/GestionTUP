import React, { useState } from 'react';
import { Heading, Input, Flex, Button } from '@chakra-ui/react';

export default function Select() {
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(event.target.value);
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
            <Flex  justifyContent={"flex-end"}>
                <Button colorScheme='blue' variant={"solid"}>Solicitar</Button>
            </Flex>
        </Flex>
    );
};
