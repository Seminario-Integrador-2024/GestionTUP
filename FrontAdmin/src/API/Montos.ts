import { controllers } from 'chart.js';
import Cookies from 'js-cookie';

export const FetchMontos = async (offset: number, limit: number) => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch(
      `https://gestiontup-42tx6kvt3q-uc.a.run.app/pagos/compromisos/?offset=${offset}&limit=${limit}`,
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
      console.log(data);
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
    console.log(compromisoData);

    const response = await fetch('https://gestiontup-42tx6kvt3q-uc.a.run.app/pagos/compromisos/', {
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
      const errorResponse = await response.json();
      throw new Error(
        'Error en la respuesta del servidor: ' + JSON.stringify(errorResponse)
      );
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
