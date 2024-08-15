import Estadisticas from './components/Pages/Estadisticas/Estadisticas';
import ErrorPage from './components/Pages/Error404';
import Configuracion from './components/Pages/Configuracion/ConfigPage';
import Estadisticas from './components/Pages/Estadisticas/Estadisticas';
import ErrorPage from './components/Pages/Error404';
import Configuracion from './components/Pages/Configuracion/ConfigPage';

const routes = [
  {
    path: 'estadisticas',
    element: <Estadisticas />,
  },
  {
    path: 'configuración',
    element: <Configuracion />,
  },
  {
    path: 'error404',
    element: <ErrorPage />,
  },
];

export default routes;
