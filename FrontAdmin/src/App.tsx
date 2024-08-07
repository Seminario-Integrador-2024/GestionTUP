import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import Estadisticas from "./components/Pages/Estadisticas/Estadisticas"
import ErrorPage from "./components/Pages/Error404";
import LoginPage from "./components/Pages/Login/LoginPage";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "Estadisticas",
        element: <Estadisticas />,
      },
      {
        path: "/",
        element: <Navigate to="/Estadisticas" />,
      },
      // {
      //   path: "error404",
      //   element: <ErrorPage/>,
      // },
      {
        path: '/login',
        element: <LoginPage />,
      }
    
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);


function App() {
  useEffect(() => {
    document.title = "TUP Admin"; 
  }, []);

  return (
    <>
      <ChakraProvider>
          <RouterProvider router={router} />
    </ChakraProvider>
    </>
  )
}

export default App
