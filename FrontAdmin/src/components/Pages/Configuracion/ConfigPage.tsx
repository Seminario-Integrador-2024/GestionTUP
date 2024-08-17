import { Box, Grid, GridItem } from '@chakra-ui/react';
import Montos from './Montos/Montos';
import CardCarga from './CardCarga';

function Configuracion() {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Montos />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }} mt="20px">
        <CardCarga texto="Compromiso de Pago" />
      </GridItem>
    </Grid>
  );
}

export default Configuracion;
