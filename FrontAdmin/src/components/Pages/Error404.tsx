import React, { useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const url = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (url.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, url.pathname]);

  return (
    <Box textAlign="center" p="1rem">
      <Text fontSize="3rem">404</Text>
      <Text fontSize="2xl">Página no encontrada</Text>
      <Link to="/Estadisticas">
        <Button colorScheme="blue" variant="solid" size="md" mt="4">
          Ir al Inicio
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;

