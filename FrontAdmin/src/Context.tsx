import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FetchLogin } from './API/Login';
const URL= import.meta.env.VITE_URL_DEV;

interface AuthContextType {
  isAuthenticated: boolean;
  rolUser: String[];
  onLogin: (password: string, account: string) => Promise<void>;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [rolUser, setRolUser] = useState<String[]>(() => {
    const storedUserRol = localStorage.getItem('userRol');
    return storedUserRol ? JSON.parse(storedUserRol) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    (!Cookies.get('tokennn') ) ? false : true
  );
  
  let refreshTimeout: NodeJS.Timeout;

  const refreshToken = async () => {
    const refresh = Cookies.get('refresh_token');
    if (!refresh) {
      onLogout();
      return;
    }

    try {
      const response = await fetch(`${URL}/users/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
        console.log('Token refreshed');
        const data = await response.json();
        console.log(data);
        Cookies.set('tokennn', data.access);
        Cookies.set('refresh_token', data.refresh);
        Cookies.set('access_expiration', data.access_expiration);
        Cookies.set('refresh_expiration', data.refresh_expiration);
        TokenRefresh(data.access_expiration);
      } else {
        onLogout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      onLogout();
    }
  };

  const TokenRefresh = (accessExpiration: string) => {
    const expirationTime = new Date(accessExpiration).getTime();
    const currentTime = new Date().getTime();
    const timeout = expirationTime - currentTime - 30000; 

    if (timeout > 0) {
      refreshTimeout = setTimeout(refreshToken, timeout);
    }
  };

  const onLogin = async (password: string, account: string) => {
    try {
      await FetchLogin(password, account);
      setRolUser(JSON.parse(localStorage.getItem('userRol') || '[]'));
      setIsAuthenticated(true);
      
      const accessExpiration = Cookies.get('access_expiration');
      if (accessExpiration) {
        TokenRefresh(accessExpiration);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      if (error instanceof Error) {
        throw new Error(
          error.message || 'Error durante el inicio de sesión, intente nuevamente'
        );
      } else {
        throw new Error('Error durante el inicio de sesión, intente nuevamente');
      }
    }
  };

  const onLogout = () => {
    console.log('logout');
    
    // Verificar y eliminar cookies
    const cookiesToRemove = [
      'tokennn',
      'refresh_token',
      'access_expiration',
      'refresh_expiration',
      'username',
      'dni',
      'full_name',
    ];
  
    cookiesToRemove.forEach(cookie => {
      if (Cookies.get(cookie)) {
        Cookies.remove(cookie, { path: '/', domain: window.location.hostname });
        console.log(`Cookie ${cookie} eliminada`);
      } else {
        console.log(`Cookie ${cookie} no encontrada`);
      }
    });
  
    // Eliminar item de localStorage
    localStorage.removeItem('userRol');
    setIsAuthenticated(false);
  
    // Limpiar timeout de refresh
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const accessExpiration = Cookies.get('access_expiration');
      if (accessExpiration) {
        TokenRefresh(accessExpiration);
      }
    }
    return () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, onLogin, onLogout, rolUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
