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
import { CiPlay1 } from "react-icons/ci";
import { VscDebugRerun } from "react-icons/vsc";
import { RiContractLine } from 'react-icons/ri';
import { CiSaveDown1 } from 'react-icons/ci';
import Alumnos from './components/Pages/Alumnos/Alumnos';
import { PiStudentLight } from 'react-icons/pi';
import FichaAlumno from './components/Pages/Alumnos/SubPages/FichaAlumno'; import CompromisoDePago from './components/Pages-Alumnos/CompromisoDePago';
import ListadoAlumnosQueCursanMateria from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ListadoAlumnosQueCursanMateria';
import AlumnosCompromisoPago from './components/Pages/Estadisticas/SubPages/Alumnos-que-fimaron-compromiso-de-pago';
import Select from './components/Pages/Estadisticas/SubPages/Cuotas/Select';
import SelectPagos from './components/Pages/Estadisticas/SubPages/Pagos/Select';
import Listado from './components/Pages/Estadisticas/SubPages/Cuotas/Listado';
import path from 'path';
import EstadoCuenta from './components/Pages-Alumnos/EstadoCuenta/EstadoCuenta';
import Sysadmin from './components/Pages/SysAdmin/SysAdmin';
import Matricula from './components/Pages/Estadisticas/SubPages/Matricula';
import Pagos from './components/Pages/Estadisticas/SubPages/Pagos/Pagos';
import Inhabilitados from './components/Pages/Estadisticas/SubPages/Inhabilitaciones/Inhabilitaciones';
import AlumnosBaja from './components/Pages/Estadisticas/AlumnosBaja';
import DarseBaja from './components/Pages-Alumnos/DarseBaja/DarseBaja';
import Deuda from './components/Pages/Estadisticas/SubPages/Pagos/Deuda';
import PendientesFirma from './components/Pages/Estadisticas/SubPages/PendientesFirma';
import Tareas from './components/Pages/TareasProgramadas/Tareas';
import Excels from './components/Pages/Excels/Excels';
import TablaMaterias from './components/Pages/Sysacad/Materias/TablaMaterias';
import { LuDatabaseBackup } from "react-icons/lu";

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
    path: 'estadisticas/',
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
        path: 'baja-provisoria',
        element: <AlumnosBaja />,
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
        path: 'alumnos-que-cursan-materia/:codigo_materia/alumnos',
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
        element: <SelectPagos />,
        rol: 'admin',
      },
      {
        path: 'pagos/:fecha_inicio/:fecha_fin',
        element: <Pagos />,
        rol: 'admin',
      },
      {
        path: 'deudas',
        element: <Deuda />,
        rol: 'admin',
      },
      {
        path: 'inhabilitaciones',
        element: <Inhabilitados />,
        rol: 'admin',
      },
      {
        path: 'pendientes-firma-compromiso',
        element: <PendientesFirma />,
        rol: 'admin',

      },
    ],
  },
  {
    path: 'excels',
    title: 'Excels',
    element: <Excels/>,
    icon: iconSysAdmin,
    rol: 'admin',
  },
  {
    path: 'academica',
    title: 'Académica',
    element: <TablaMaterias />,
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
    path: 'procesos-automaticos',
    element: <Tareas />,
    title: 'Procesos Automáticos',
    rol: 'admin',
    icon: <LuDatabaseBackup size="30px" />,
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
    element: <DarseBaja/>,
    rol: 'alumnos',
    icon: <CiSaveDown1 size="30px" />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
