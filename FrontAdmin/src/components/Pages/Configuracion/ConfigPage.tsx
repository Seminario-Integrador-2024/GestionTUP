import { Stack} from "@chakra-ui/react";
import CardCarga from "./CardCarga";


function Configuracion() {

  return (
    <Stack direction="row" spacing={2} align="center" >
     <CardCarga texto="Compromiso de Pago" />
     <CardCarga texto="Sysacad" />
    </Stack>
  );
}

export default Configuracion;
