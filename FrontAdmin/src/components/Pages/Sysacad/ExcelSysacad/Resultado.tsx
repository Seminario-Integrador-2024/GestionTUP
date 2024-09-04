import datos from '../../../../API/Sysacad.ts';
import { useState, useEffect } from 'react';
import {Stack, Flex, Text} from '@chakra-ui/react';
interface DataItem {
    "id": string;
    "Apellido y Nombres": string | null;
    "Celular": string | null;
    "Tel. Resid"?: string | null;
    "Teléfono": string | null;
  }
  
  //recibe los datos como parametros y los muestra en pantalla
  function Resultado() {
    const [data, setData] = useState<DataItem[]>([]);
  
    useEffect(() => {
        //mapear a array de objetos pq viene un diccionario
      const dataArray = Object.entries(datos).map(([key, value]) => ({
        id: key,
        ...value
      })) as DataItem[];
      //setData(dataArray);
    }, []);
  
    return (
        <Stack mt={7}>
            <Text fontSize="xl" fontWeight="bold">Errores de formato encontrados. Por favor, revisar:</Text>
            {data.map((item, index) => (
                <Flex key={index} direction="column" p={3} borderRadius="8px" mb={2} bg="#F8C0BB" w={800}>
                    <Text fontWeight={500}> Error en la linea {item.id}, en el/los campo/s: {item["Apellido y Nombres"] && "Apellido y Nombres"} {item["Celular"] && "Celular"} {item["Tel. Resid"] && "Tel. Resid"} {item["Teléfono"] && "Teléfono"} 
                    </Text>
                </Flex>
            ))}
        </Stack>
    );
  }
  
  export default Resultado;