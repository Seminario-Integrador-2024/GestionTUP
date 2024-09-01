import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './Context';
import Auth from './layouts/Auth';
import Admin from './layouts/Admin';
import Alumnos from './layouts/Alumnos';
import theme from './theme/theme';
import Cookies from 'js-cookie';

function App() {
  useEffect(() => {
    document.title = 'TUP Admin';
  }, []);

  const { isAuthenticated, rolUser } = useAuth();
  console.log(isAuthenticated, rolUser);


  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && <Route path="/auth/*" element={<Auth />} />}
          {isAuthenticated && rolUser && <Route path="/admin/*" element={<Admin />} />}
          {isAuthenticated && !rolUser && <Route path="/alumnos/*" element={<Alumnos />} />}
          <Route
            path="/*"
            element={
              <Navigate
                replace
                to={isAuthenticated ? (rolUser?  '/admin/estadisticas': '/alumnos') : '/auth'}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
