import { Box, Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import Montos from './Montos/Montos';
import CardCarga from './CardCarga';
import { FetchMontos } from '../../../API/Montos';
import { useEffect, useState } from 'react';
import NewInterfaz from './Montos/NewInterfaz';
import { AddIcon } from '@chakra-ui/icons';

function Configuracion() {
  const [montos, setMontos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const getMontos = async () => {
      try {
        const data = await FetchMontos();
        setMontos(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getMontos();
  }, []);

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
      <GridItem colSpan={2} mt="20px">
        
          <Button color="white" leftIcon={<AddIcon />}>
            Nuevo Cuatrimestre
          </Button>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <NewInterfaz texto="Monto de Carga" compromisos={montos} />
      </GridItem>
    </Grid>
  );
}

export default Configuracion;
