import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './Context';
import Auth from './layouts/Auth';
import Admin from './layouts/Admin';
import Alumnos from './layouts/Alumnos';
import theme from './theme/theme';

function App() {
  useEffect(() => {
    document.title = 'TUP Admin';
  }, []);

  const { isAuthenticated, rolUser } = useAuth();

  const isAdmin = rolUser.includes('staff') || rolUser.includes('Administradores');
  const isAlumno = rolUser.includes('Alumno');


  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && <Route path="/auth/*" element={<Auth />} />}
          {isAuthenticated && isAdmin && (
              <Route path="/admin/*" element={<Admin />} />
            )}
            {isAuthenticated && isAlumno && (
              <Route path="/alumnos/*" element={<Alumnos />} />
            )}
          <Route
            path="/*"
            element={
              <Navigate
                replace
                to={
                  isAuthenticated
                    ? isAdmin
                      ? '/admin/alumnos'
                      : isAlumno? '/alumnos/cuenta' : '/auth'
                    : '/auth'
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
