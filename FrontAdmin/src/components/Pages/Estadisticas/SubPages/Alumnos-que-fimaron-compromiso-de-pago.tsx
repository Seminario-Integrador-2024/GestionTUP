import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import AlumnosConCompromiso from './AlumnosConCompromiso';
import AlumnosSinCompromiso from './AlumnosSinCompromiso';

const AlumnosCompromisoPago: React.FC = () => {
  const [index, setIndex] = useState(0); // Estado para manejar la pestaña seleccionada

  return (
    <div>
      <Tabs variant="enclosed" index={index} onChange={setIndex} isLazy>
        <TabList display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200">
          <Tab
            _selected={{
              borderBottom: "2px solid",
              borderColor: "blue.500",
              color: "blue.500",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none"
            }}
            _focus={{ boxShadow: "none" }}
          >
            Firmaron
          </Tab>
          <Tab
            _selected={{
              borderBottom: "2px solid",
              borderColor: "blue.500",
              color: "blue.500",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none"
            }}
            _focus={{ boxShadow: "none" }}
          >
            No firmaron
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AlumnosConCompromiso />
          </TabPanel>
          <TabPanel>
            <AlumnosSinCompromiso />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AlumnosCompromisoPago;


