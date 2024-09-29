import Cookies from 'js-cookie';

export const AbonaronCuota = async (fecha: string) => {
    try {

    const token = Cookies.get('tokennn');
    const response = await fetch(`http://localhost:8000/api/alumnos/pagaron-cuota/${fecha}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }

    });
    
    if (response.ok) {
        const data = await response.json();
        return data; //nose si lo dejo o que hago
      } else {
        const errorData = await response.json();
        throw new Error(
          `Error en la respuesta del servidor: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error('Network error:', error);
    }
};

export const NoAbonaronCuota = async (fecha: string) => {
    try {

    const token = Cookies.get('tokennn');
    const response = await fetch(`http://localhost:8000/api/alumnos/no-pagaron-cuota/${fecha}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        return data; //nose si lo dejo o que hago
      } else {
        const errorData = await response.json();
        throw new Error(
          `Error en la respuesta del servidor: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error('Network error:', error);
    }
};

