import { Grid, GridItem, Flex, Button, Text, Box, Spinner } from '@chakra-ui/react';
import Montos from './Montos/Montos';
import { FetchMontos } from '../../../API/Montos';
import { useEffect, useState } from 'react';
import NewInterfaz from './Montos/NewInterfaz';

function Configuracion() {
  const [montos, setMontos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMontos = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const data = await FetchMontos(offset, limit);

      setMontos(data.results);
      setTotalCount(data.count);
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

  useEffect(() => {
    fetchMontos(offset, limit);
  }, [offset, limit]);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} pb="80px">
      <GridItem colSpan={2} mt="20px">
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Montos compromisos={montos} fetchMontos={() => fetchMontos(offset, limit)} />
            <NewInterfaz compromisos={montos} fetchMontos={() => fetchMontos(offset, limit)} />
          </>
        )}
      </GridItem>
      <Box position="fixed" bottom="0" width="90%" bg="white" p="10px" boxShadow="md">
        <Flex justifyContent="space-between">
          <Button onClick={handlePreviousPage} isDisabled={offset === 0} color="white">
            Anterior
          </Button>
          <Text>Página {Math.ceil(offset / limit) + 1} de {Math.ceil(totalCount / limit)}</Text>
          <Button onClick={handleNextPage} isDisabled={offset + limit >= totalCount} color="white">
            Siguiente
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
}

export default Configuracion;
