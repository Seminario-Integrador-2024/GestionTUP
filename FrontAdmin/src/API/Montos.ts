import Cookies from 'js-cookie';
const URL = import.meta.env.VITE_URL_DEV;

export const FetchMontos = async (offset: number, limit: number) => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(
      `${URL}/pagos/compromisos/?offset=${offset}&limit=${limit}`,
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

export const createCompromiso = async (compromisoData: any, selectFile: any) => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(`http://localhost:8000/api/compromisos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(compromisoData),
    });

    if (response.ok) {
      const data = await response.json();
      await loadPDF(data.id_comp_pago ,selectFile);
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

export const loadPDF = async (id :string,file: File) => {
  try {
    const token = Cookies.get('tokennn');

    const formData = new FormData();
    formData.append('archivo_pdf', file);

    const response = await fetch(`${URL}/pagos/compromisos/${id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    throw new Error('Network error: ' +  JSON.stringify(error));
  }
};
