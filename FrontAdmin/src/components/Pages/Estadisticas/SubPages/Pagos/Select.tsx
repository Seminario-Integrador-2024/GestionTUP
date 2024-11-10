import React, { useState } from 'react';
import { Heading, Input, Flex,Button , Text } from '@chakra-ui/react';
import {formatoFechaISOaAAAAMMDD} from '../../../../../utils/general';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SelectPagos () {
    const [selectedStartMonth, setSelectedStartMonth] = useState('');
    const [selectedEndMonth, setSelectedEndMonth] = useState('');
    const [mesInicio, setmesInicio] = useState('');
    const [mesFin, setmesFin] = useState('');
    const [today, setToday] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedStartMonth && selectedEndMonth) {
            navigate(`/admin/estadisticas/pagos/${selectedStartMonth}/${selectedEndMonth}`);
        }
    }, [selectedStartMonth, selectedEndMonth]);

    const handleMonthStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [year, month, day] = event.target.value.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        setSelectedStartMonth(formattedDate);
        setmesInicio(event.target.value);
    };

    const handleMonthEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [year, month, day] = event.target.value.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        setSelectedEndMonth(formattedDate);
        setmesFin(event.target.value);
    };

    const handleButtonClick = () => {
        const formattedStartMonth = selectedStartMonth.split('-').reverse().join('-');
        const formattedEndMonth = selectedEndMonth.split('-').reverse().join('-');
        setSelectedStartMonth(formattedStartMonth);
        setSelectedEndMonth(formattedEndMonth);
    };

    const handleMesActual = () => {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        const startMonth = `01-${month}-${year}`;
        const endMonth = `${day}-${month}-${year}`;
        setSelectedStartMonth(startMonth);
        setSelectedEndMonth(endMonth);
    };

    const handleCuatrimestreActual = () => {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        const startMonth = `01-08-${year}`;
        const endMonth = `${day}-${month}-${year}`;
        setSelectedStartMonth(startMonth);
        setSelectedEndMonth(endMonth);
    };

    const handleAnioActual = () => {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        const startMonth = `01-03-${year}`;
        const endMonth = `${day}-${month}-${year}`;
        setSelectedStartMonth(startMonth);
        setSelectedEndMonth(endMonth);
    };


    return (
        <Flex gap={2} direction={"column"}>
            <Heading fontSize={22} mt={6}>Seleccione un periodo</Heading>
            <Flex direction={'row'} w={'100%'} gap={4} mt={2}>
                <Button w={'100%'} variant={'light'}
                onClick={handleMesActual}>
                    Mes Actual
                </Button >
                <Button variant={'light'} w={'100%'}
                onClick={handleCuatrimestreActual}>
                    Cuatrimestre Actual
                </Button>
                <Button variant={'light'} w={'100%'}
                onClick={handleAnioActual}>
                    Año Actual
                </Button>
            </Flex>
            <Flex mt={4} gap={4}>
            <Input
                type="date"
                value={mesInicio}
                onChange={handleMonthStartChange}
            />
            <Text> - </Text>
            <Input
                type="date"
                value={mesFin}
                onChange={handleMonthEndChange}
            />
            </Flex>
            <Flex  justifyContent={"flex-end"} mt={1}>
                <Button colorScheme='blue' variant={"solid"}
                 onClick={handleButtonClick}
                 isDisabled={!selectedStartMonth || !selectedEndMonth}
                >Solicitar</Button>
            </Flex>
        </Flex>
    );
};

export default SelectPagos;
