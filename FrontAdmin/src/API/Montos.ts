import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch(
      'http://localhost:8000/pagos/compromisos/',
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

export const createCompromiso = async (compromisoData: any) => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch('http://localhost:8000/pagos/compromisos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(compromisoData),
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
