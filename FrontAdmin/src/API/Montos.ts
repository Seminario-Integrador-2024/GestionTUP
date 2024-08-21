import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch(
      'http://127.0.0.1:8000/pagos/compromisos/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
