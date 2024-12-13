import Cookies from 'js-cookie';

const fetchAlumnosCompromiso = async (url: string): Promise<any> => {
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

export const FetchFirmantes = async (cuatrimestre: string, anio: number): Promise<any> => {
  const url = `http://localhost:8000/api/alumnos/firmaron-compromiso/${cuatrimestre}/${anio}`;
  return fetchAlumnosCompromiso(url);
};

export const FetchNoFirmantes = async (cuatrimestre: string, anio: number): Promise<any> => {
  const url = `http://localhost:8000/api/alumnos/no-firmaron-compromiso/${cuatrimestre}/${anio}`;
  return fetchAlumnosCompromiso(url);
};