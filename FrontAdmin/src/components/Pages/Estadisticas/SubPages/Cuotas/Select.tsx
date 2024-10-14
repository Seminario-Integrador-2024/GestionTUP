import React, { useState } from 'react';
import { Heading, Input, Flex, Button } from '@chakra-ui/react';
import {formatoFechaAAAAMMaMMAAAA} from '../../../../../utils/general';
import { useNavigate } from 'react-router-dom';

type SelectProps = {
    page: string;
}

const Select: React.FC<SelectProps> = ({ page }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const navigate = useNavigate();

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
                 onClick={handleButtonClick}
                >Solicitar</Button>
            </Flex>
        </Flex>
    );
};

export default Select;
