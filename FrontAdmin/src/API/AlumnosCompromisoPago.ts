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
      console.log(data)
      return data;
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

export const FetchFirmantes = async (): Promise<any> => {
  const url = 'http://localhost:8000/api/firmantes/alumnos-firmaron-ultimo-compromiso/';
  return fetchAlumnosCompromiso(url);
};

export const FetchNoFirmantes = async (): Promise<any> => {
  const url = 'http://localhost:8000/api/firmantes/alumnos-no-firmaron-ultimo-compromiso/';
  return fetchAlumnosCompromiso(url);
};
