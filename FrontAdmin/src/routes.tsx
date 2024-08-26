import Estadisticas from './components/Pages/Estadisticas/Estadisticas';
import ErrorPage from './components/Pages/Error404';
import Configuracion from './components/Pages/Configuracion/Configuracion';
import Sysacad from './components/Pages/Sysacad/Sysacad';
import ListadoMaterias from './components/Pages/Estadisticas/SubPages/ListadoMaterias';
import MateriaDetalle from './components/Subjects/MateriaDetalle';
import ListadoAlumnos from './components/Pages/Estadisticas/SubPages/ListadoAlumnos';

const routes = [
  {
    path: 'estadisticas',
    element: <Estadisticas />,
    children: [
      {
        path: 'alumnos-que-cursan-materia',
        element: <ListadoMaterias />,
      },
    ],
  },
  {
    path: 'estadisticas/alumnos-que-cursan-materia/:url',
    element: <ListadoAlumnos />,
  },
  {
    path: 'sysacad',
    element: <Sysacad />,
  },
  {
    path: 'configuracion',
    element: <Configuracion />,
  },
  {
    path: 'error404',
    element: <ErrorPage />,
  },
];

export default routes;
