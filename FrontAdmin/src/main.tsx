import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './Context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
