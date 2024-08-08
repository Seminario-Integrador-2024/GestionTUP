import Estadisticas from "./components/Pages/Estadisticas/Estadisticas";
import ErrorPage from "./components/Pages/Error404";

var routes = [
    {
      path: "estadisticas",
      component: Estadisticas,
      layout: "admin",
    },
    {
      path: "*",
      component: ErrorPage,
    },
];

export default routes;