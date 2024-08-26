import React from 'react';
import { Select } from '@chakra-ui/react';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    placeholder: string;
    options: SelectOption[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ placeholder, options, value, onChange }) => {
    return (
        <Select placeholder={placeholder} value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};

export default CustomSelect;
