import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    const token = Cookies.get('access_token');
    const response = await fetch(
      'https://gestiontup-42tx6kvt3q-uc.a.run.app/pagos/compromisos/',
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
