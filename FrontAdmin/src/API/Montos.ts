import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    // Obtén el token de acceso de las cookies
    const accessToken = Cookies.get('access');

    const response = await fetch('http://localhost:8000/pagos/compromisos/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Authorization failed');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
