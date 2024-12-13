import React from 'react';
import { Tab } from '@chakra-ui/react';

interface CustomTabProps {
  title: string;
}

const CustomTab: React.FC<CustomTabProps> = ({ title }) => {
  return (
    <Tab
      _selected={{
        borderBottom: "2px solid",
        borderColor: "blue.500",
        color: "blue.500",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      }}
      _focus={{ boxShadow: "none" }}
    >
      {title}
    </Tab>
  );
};

export default CustomTab;
