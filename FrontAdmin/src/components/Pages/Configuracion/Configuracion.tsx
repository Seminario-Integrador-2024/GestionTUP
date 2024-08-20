import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import Montos from './Montos/Montos';
import CardCarga from './CardCarga';
import { FetchMontos } from '../../../API/Montos';
import { useEffect, useState } from 'react';

function Configuracion() {
  const [montos, setMontos] = useState([]); // Estado inicial como un array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener los datos
    const getMontos = async () => {
      try {
        const data = await FetchMontos();
        setMontos(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        // Verifica el tipo de error y actualiza el estado de error
        if (error instanceof Error) {
          setError(error.message); // Manejo de errores
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    getMontos(); // Llama a la función para obtener los datos
    console.log(montos);
  }, []); // Dependencias vacías para ejecutar solo al montar el componente


  /* const ultimoMonto = montos[montos.length - 1]; // Obtener el último monto */

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Montos />
      </GridItem>
      <GridItem colSpan={2} mt="20px">
        <CardCarga texto="Compromiso de Pago" compromisos={montos} />
        <Button
          onClick={() => {
            console.log(montos);
          }}
        />
      </GridItem>
    </Grid>
  );
}

export default Configuracion;
