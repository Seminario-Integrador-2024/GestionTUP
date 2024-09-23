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
import ProgramacionUno from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ProgramacionUno';
import Matematica from './components/Pages/Estadisticas/SubPages/PaginasMaterias/Matematica';
import ArquitecturaSO from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ArquitecturaSO';
import OrganizacionEmpresarial from './components/Pages/Estadisticas/SubPages/PaginasMaterias/OrganizacionEmpresarial';
import ProgramacionTres from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ProgramacionTres';
import BaseDeDatosDos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/BaseDeDatosDos';
import MetodologiaSistemas from './components/Pages/Estadisticas/SubPages/PaginasMaterias/MetodologiaSistemas';
import InglesDos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/InglesDos';
import ProgramacionDos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ProgramacionDos';
import ProbabilidadEstadistica from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ProbabilidadEstadistica';
import BaseDeDatos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/BaseDeDatos';
import Ingles from './components/Pages/Estadisticas/SubPages/PaginasMaterias/Ingles';
import ProgramacionCuatro from './components/Pages/Estadisticas/SubPages/PaginasMaterias/ProgramacionCuatro';
import MetodologiaSistemasDos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/MetodologiaSistemasDos';
import IntroduccionAnalisisDatos from './components/Pages/Estadisticas/SubPages/PaginasMaterias/IntroduccionAnalisisDatos';
import Legislacion from './components/Pages/Estadisticas/SubPages/PaginasMaterias/Legislacion';
import GestionDS from './components/Pages/Estadisticas/SubPages/PaginasMaterias/GestionDS';
import TFI from './components/Pages/Estadisticas/SubPages/PaginasMaterias/TFI';

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
        children: [
          {
            path: 'programacion-uno',
            element: <ProgramacionUno />,
          },
          {
            path: 'arquitectura-y-sistemas-operativos',
            element: <ArquitecturaSO />,
          },
          {
            path: 'matematica',
            element: <Matematica />,
          },
          {
            path: 'organizacion-empresarial',
            element: <OrganizacionEmpresarial />,
          },
          {
            path: 'programacion-tres',
            element: <ProgramacionTres />,
          },
          {
            path: 'base-de-datos-dos',
            element: <BaseDeDatosDos />,
          },
          {
            path: 'metodologia-de-sistemas',
            element: <MetodologiaSistemas />,
          },
          {
            path: 'ingles-dos',
            element: <InglesDos />,
          },
          {
            path: 'programacion-dos',
            element: <ProgramacionDos />,
          },
          {
            path: 'probabilidad-y-estadistica',
            element: <ProbabilidadEstadistica />,
          },
          {
            path: 'base-de-datos',
            element: <BaseDeDatos />,
          },
          {
            path: 'ingles-uno',
            element: <Ingles />,
          },
          {
            path: 'programacion-cuatro',
            element: <ProgramacionCuatro />,
          },
          {
            path: 'metodologia-de-sistemas-dos',
            element: <MetodologiaSistemasDos />,
          },
          {
            path: 'introduccion-al-analisis-de-datos',
            element: <IntroduccionAnalisisDatos />,
          },
          {
            path: 'legislacion',
            element: <Legislacion />,
          },
          {
            path: 'gestion-desarrollo-software',
            element: <GestionDS />,
          },
          {
            path: 'trabajo-final-integrador',
            element: <TFI />,
          },
        ],
      },
      {
        path: 'estadisticas/alumnos-que-cursan-materia/:url',
        element: <ListadoAlumnos />,
        rol: 'admin',
      },
    ],
  },
  {
    path: 'sysadmin',
    title: 'SysAdmin',
    element: <ErrorPage />,
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
    element: <ErrorPage />,
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
