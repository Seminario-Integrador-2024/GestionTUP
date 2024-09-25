import Cookies from 'js-cookie';

export const FetchEstadoCuenta = async (dni: number) => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(`http://localhost:8000/api/cuotas/alumno/${dni}/`, {
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
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
