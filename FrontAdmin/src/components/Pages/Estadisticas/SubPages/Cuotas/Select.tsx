import React, { useState } from 'react';
import { Heading, Input, Flex, Button, Alert, AlertIcon } from '@chakra-ui/react';
import {formatoFechaAAAAMMaMMAAAA} from '../../../../../utils/general';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type SelectProps = {
    page: string;
}

const Select: React.FC<SelectProps> = ({ page }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        setSelectedMonth(`${year}-${month}`);
    }, []);

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleButtonClick = () => {
        const [year, month] = selectedMonth.split('-');
        if (page === 'cuotas') {
        navigate(`/admin/estadisticas/cuotas/${month}-${year}`);
        } else if (page === 'pagos') {
        navigate(`/admin/estadisticas/pagos/${year}-${month}`);
        }
    };

    return (
        <Flex display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" p={4}>
            <Alert status='info'  mb={12}> <AlertIcon /> Informe correspondiente a los pagos efectuados POR un mes específico</Alert>
            <Heading fontSize="3xl" fontWeight="bold" mb={6}>Seleccione un mes</Heading>
            <Input
                type="month"
                id="month"
                name="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                mb={4}
                width="100%" 
                maxWidth="400px" 
            />
            <Flex  justifyContent={"flex-end"} mt={1}>
                <Button colorScheme='blue' variant={"solid"}
                 onClick={handleButtonClick}
                >Solicitar</Button>
            </Flex>
        </Flex>
    );
};

export default Select;
