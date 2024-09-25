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
  const [isAuthenticated, setIsAuthenticated] = useState(
    !Cookies.get('access_token') ? false : true
  );
  const [rolUser, setRolUser] = useState<String[]>([]);
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
        Cookies.set('access_token', data.access);
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
    await FetchLogin(password, account);
    setRolUser(JSON.parse(localStorage.getItem('userRol') || '[]'));
    setIsAuthenticated(true);
    const accessExpiration = Cookies.get('access_expiration');
    if (accessExpiration) {
      TokenRefresh(accessExpiration);
    }
  };

  const onLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('access_expiration');
    Cookies.remove('refresh_expiration');
    Cookies.remove('username');
    Cookies.remove('dni');
    localStorage.removeItem('userRol');
    console.log('logout');
    setIsAuthenticated(false);
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
