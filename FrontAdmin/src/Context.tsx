import { createContext, useState, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!Cookies.get('access') ? false : true);

  const onLogin = () => {
    setIsAuthenticated(true);
  };

  const onLogout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    Cookies.remove('access_expiration');
    Cookies.remove('refresh_expiration');
    Cookies.remove('username');
    console.log('logout');  
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
