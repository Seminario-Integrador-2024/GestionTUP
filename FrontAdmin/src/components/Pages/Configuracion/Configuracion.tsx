import { Grid, GridItem } from '@chakra-ui/react';
import Montos from './Montos/Montos';
import { FetchMontos } from '../../../API/Montos';
import { useEffect, useState } from 'react';
import NewInterfaz from './Montos/NewInterfaz';


function Configuracion() {
  const [montos, setMontos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    
    const getMontos = async () => {
      try {
        const data = await FetchMontos();
        console.log(data);
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
          <Montos compromisos={montos} />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <NewInterfaz  compromisos={montos} />
      </GridItem>
    </Grid>
  );
}

export default Configuracion;
