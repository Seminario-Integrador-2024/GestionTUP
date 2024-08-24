import iconAlumno from '../icons/alumno 1.png';
import iconChat from '../icons/burbuja-de-chat 1.png';
import iconConfig from '../icons/configuracion 1.png';
import iconEstadisticas from '../icons/grafico-de-barras 1.png';
import iconSysAdmin from '../icons/cargarexcel.png';
import iconSysAcad from '../icons/subir lista.png';

export const LINK_ITEMS = [
  { icon: iconAlumno, url: 'alumnos', title: 'Alumnos' },
  {
    icon: iconEstadisticas,
    url: 'estadisticas',
    title: 'Estadísticas',
    accordion: [
      { title: 'ListadoAlumnos', url: 'listadoalumnos' },
      { title: 'Estadisticas', url: 'estadisticas' },
    ],
  },
  { icon: iconSysAdmin, url: 'sysadmin', title: 'SysAdmin' },
  { icon: iconSysAcad, url: 'sysacad', title: 'SysAcad' },
  { icon: iconConfig, url: 'configuracion', title: 'Configuración' },
];
