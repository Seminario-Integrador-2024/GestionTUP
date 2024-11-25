import Cookies from 'js-cookie';

export const FetchPendientesFirma = async () => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(
      `http://localhost:8000/api/estadisticas/firmas_pendientes/`,
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
      return {
        results: data.results, // Lista de resultados
        count: data.count,     // Total de elementos
      };
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};