import Estadisticas from './components/Pages/Estadisticas/Estadisticas';
import ErrorPage from './components/Pages/Error404';
import Configuracion from './components/Pages/Configuracion/Configuracion';
import Sysacad from './components/Pages/Sysacad/Sysacad';
import AlumnosCursanMateria from './components/Pages/Estadisticas/SubPages/ListadoMaterias';

const routes = [
  {
    path: 'estadisticas/*',
    element: <Estadisticas />,
    children: [
      {
        path: 'alumnos-que-cursan-materia',
        element: <AlumnosCursanMateria />,
      },
    ],
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
