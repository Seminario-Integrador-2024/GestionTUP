import Cookies from 'js-cookie';

const fetchAlumnosAbonaronMatricula = async (url: string): Promise<any> => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(url, {
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

export const FetchAbonaronMatricula = async (cuatrimestre: string, anio: number): Promise<any> => {
  const url = `http://localhost:8000/api/alumnos/pagaron-matricula/${cuatrimestre}/${anio}`;
  return fetchAlumnosAbonaronMatricula(url);
};
export const FetchNoAbonaronMatricula = async (cuatrimestre: string, anio: number): Promise<any> => {
  const url = `http://localhost:8000/api/alumnos/no-pagaron-matricula/${cuatrimestre}/${anio}`;
  return fetchAlumnosAbonaronMatricula(url);
};
