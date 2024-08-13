import Estadisticas from "./components/Pages/Estadisticas/Estadisticas";
import ErrorPage from "./components/Pages/Error404";

const routes = [
      {
        path: "estadisticas",
        element: <Estadisticas />,  
      },
      {
        path: "error404",
        element: <ErrorPage />,
      },
];

export default routes;
