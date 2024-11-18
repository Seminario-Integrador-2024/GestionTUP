import { title } from "process";

export const ITEMS_SUBMENU = [
  { url: 'inhabilitaciones', title: 'Inhabilitaciones', tooltip: 'Alumnos que se encuentran inhabilitados' },
  { url: 'baja-provisoria', title: 'Baja Provisoria', tooltip: 'Alumnos que solicitaron la baja' },
  { url: 'cuotas', title: 'Cuotas' , tooltip: 'Alumnos que abonaron/no abonaron una respectiva cuota' },
  { url: 'matricula', title: 'Matricula', tooltip: 'Alumnos que abonaron la matricula' },
  { url: 'alumnos-que-firmaron-compromiso-de-pago', title: 'Compromiso de Pago', tooltip: 'Alumnos que firmaron el compromiso de pago' },
  { url: 'pagos', title: 'Pagos', tooltip: 'Alumnos que abonaron/no abonaron una respectiva cuota' },
  { url: 'deudas', title: 'Deudas', tooltipo: 'Alumnos que adeudan una cuota' },
  {url: 'alumnos-que-cursan-materia',title: 'Alumnos que cursan una materia', tooltip: 'Alumnos que cursan una materia'},
  { url: 'pendientes-firma-compromiso', title: 'Alumnos pendiente de firma', tooltip: 'Alumnos que cursan una materia y no firmaron el último compromiso de pago' },
];
