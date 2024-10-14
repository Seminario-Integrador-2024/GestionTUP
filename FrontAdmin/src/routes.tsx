import Estadisticas from './components/Pages/Estadisticas/Estadisticas';
import ErrorPage from './components/Pages/Error404';
import Configuracion from './components/Pages/Configuracion/Configuracion';
import Sysacad from './components/Pages/Sysacad/Sysacad';
import ListadoMaterias from './components/Pages/Estadisticas/SubPages/ListadoMaterias';
import MateriaDetalle from './components/Subjects/MateriaDetalle';
import ListadoAlumnos from './components/Pages/Estadisticas/SubPages/ListadoAlumnos';
import InformarPago from './components/Pages-Alumnos/InformarPago/InformarPago';
import iconAlumno from './components/icons/alumno 1.png';
import iconConfig from './components/icons/configuracion 1.png';
import iconEstadisticas from './components/icons/grafico-de-barras 1.png';
import iconSysAdmin from './components/icons/cargarexcel.png';
import iconSysAcad from './components/icons/subir lista.png';
import {
  FaUser,
  FaCreditCard,
  FaFileContract,
  FaSignOutAlt,
} from 'react-icons/fa';
import { BsCashCoin } from 'react-icons/bs';
import { RiContractLine } from 'react-icons/ri';
import { CiSaveDown1 } from 'react-icons/ci';
import Alumnos from './components/Pages/Alumnos/Alumnos';
import { PiStudentLight } from 'react-icons/pi';
import FichaAlumno from './components/Pages/Alumnos/SubPages/FichaAlumno'; import CompromisoDePago from './components/Pages-Alumnos/CompromisoDePago';
import ListadoAlumnosQueCursanMateria from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ListadoAlumnosQueCursanMateria';
import AlumnosCompromisoPago from './components/Pages/Estadisticas/SubPages/Alumnos-que-fimaron-compromiso-de-pago';
import Select from './components/Pages/Estadisticas/SubPages/Cuotas/Select';
import Listado from './components/Pages/Estadisticas/SubPages/Cuotas/Listado';
import path from 'path';
import EstadoCuenta from './components/Pages-Alumnos/EstadoCuenta/EstadoCuenta';
import Sysadmin from './components/Pages/SysAdmin/SysAdmin';
import Matricula from './components/Pages/Estadisticas/SubPages/Matricula';
import Pagos from './components/Pages/Estadisticas/SubPages/Pagos/Pagos';

const routes = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    element: <Alumnos />,
    icon: <PiStudentLight size="30px" />,
    rol: 'admin',
  },
  {
    path: 'alumnos/:dni',
    element: <FichaAlumno />,
  },
  {
    path: 'estadisticas/*',
    title: 'Estadísticas' /* para el tooltip*/,
    element: <Estadisticas />,
    rol: 'admin' /* para la activación de rutas segun el rol */,
    icon: iconEstadisticas,
    children: [
      {
        path: 'alumnos-que-cursan-materia',
        element: <ListadoMaterias />,
        rol: 'admin',

      },
      {
        path: 'alumnos-que-firmaron-compromiso-de-pago',
        element: <AlumnosCompromisoPago />,
        rol: 'admin',
      },
      {
        path: 'matricula',
        element: <Matricula />,
        rol: 'admin,'
      },
      {
        path: 'alumnos-que-cursan-materia/:codigo_materia',
        element: <ListadoAlumnosQueCursanMateria />,
        rol: 'admin',
      },
      {
        path: 'cuotas',
        element: <Select page={'cuotas'} />,
        rol: 'admin',
      },
      {
        path  : 'cuotas/:fecha',
        element: <Listado />,
        rol: 'admin',
      },
      {
        path: 'pagos',
        element: <Select page={'pagos'} />,
        rol: 'admin',
      },
      {
        path: 'pagos/:fecha',
        element: <Pagos />,
        rol: 'admin',
      },

    ],
  },
  {
    path: 'sysadmin',
    title: 'SysAdmin',
    element: <Sysadmin/>,
    icon: iconSysAdmin,
    rol: 'admin',
  },
  {
    path: 'sysacad',
    title: 'Academica',
    element: <Sysacad />,
    icon: iconSysAcad,
    rol: 'admin',
  },
  {
    path: 'configuracion',
    element: <Configuracion />,
    title: 'Configuración',
    rol: 'admin',
    icon: iconConfig,
  },
  {
    path: 'cuenta',
    title: 'Cuenta',
    element: <EstadoCuenta />,
    rol: 'alumnos',
    icon: iconAlumno,
  },
  {
    path: 'pagos',
    title: 'Pagos',
    element: <InformarPago />,
    rol: 'alumnos',
    icon: <BsCashCoin size="30px" />,
  },
  {
    path: 'compromisoPago',
    title: 'Compromiso de Pago',
    element: <CompromisoDePago />,
    rol: 'alumnos',
    icon: <RiContractLine size="30px" />,
  },
  {
    path: 'baja',
    title: 'Darse de Baja',
    element: <ErrorPage />,
    rol: 'alumnos',
    icon: <CiSaveDown1 size="30px" />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
