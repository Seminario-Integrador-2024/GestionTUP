import datos from '../../../../API/Sysacad.ts';
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import {Stack, Flex, Text} from '@chakra-ui/react';
interface DataItem {
    "id": string;
    "Apellido y Nombres": string | null;
    "Celular": string | null;
    "Tel. Resid"?: string | null;
    "Teléfono": string | null;
  }
  
  //recibe los datos como parametros y los muestra en pantalla
  function Resultado(data: any) {
  
  
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
            {data.map((item: { [x: string]: any; id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                <Flex key={index} direction="column" p={3} borderRadius="8px" mb={2} bg="#F8C0BB" w={800}>
                    <Text fontWeight={500}> Error en la linea {item.id}, en el/los campo/s: {item["Apellido y Nombres"] && "Apellido y Nombres"} {item["Celular"] && "Celular"} {item["Tel. Resid"] && "Tel. Resid"} {item["Teléfono"] && "Teléfono"} 
                    </Text>
                </Flex>
            ))}
        </Stack>
    );
  }
  
  export default Resultado;