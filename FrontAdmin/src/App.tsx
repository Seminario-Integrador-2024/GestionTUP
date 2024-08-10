import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Context";
import Auth from "./layouts/Auth";
import NavBar from "./components/NavBar/NavBar";
import theme from "./theme/theme";


function App() {
  useEffect(() => {
    document.title = "TUP Admin"; 
  }, []);

  const { isAuthenticated } = useAuth();


  return (
    <ChakraProvider theme={theme}>
         <BrowserRouter>
         <Routes>
              {!isAuthenticated && <Route path="/auth/*" element={<Auth />} />}
              {isAuthenticated && <Route path="/admin/*" element={<NavBar/>}/>} 
              <Route path="/*" element={<Navigate replace to={isAuthenticated ? "/admin" : "/auth"}/>} />
          </Routes>
      </BrowserRouter> 
    </ChakraProvider>
  )
}

export default App
