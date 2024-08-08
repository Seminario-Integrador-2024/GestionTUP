import { Route, Routes } from 'react-router-dom';
import routes from '../routes';
import  NavBar  from '../components/NavBar/NavBar';


export default function Dashboard() {

  const getRoutes = (routes: any[]) => {
    return routes.map((prop, key) => {
      if (prop.layout === 'admin') {
        console.log(prop);
        return <Route path={prop.path} element={<prop.component />} key={key} />;
      } else {
        return null;
      }
    });
  };

  
 
  return (
    <>
    <NavBar/>
    </>
  );
}
