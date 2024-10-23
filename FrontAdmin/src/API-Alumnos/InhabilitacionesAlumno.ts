import Cookies from 'js-cookie';

export const inhabilitacionesA = async (
    dni: number,
) => {
    try {
        const token = Cookies.get('tokennn');

        const response = await fetch(`http://localhost:8000/api/alumnos/${dni}/inhabilitaciones/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            return data; 
          } else {
            const errorData = await response.json();
            throw new Error(
              `Error en la respuesta del servidor: ${errorData.message}`
            );
          }
        } catch (error) {
          console.error('Network error:', error);
          throw error;
        }

        
};