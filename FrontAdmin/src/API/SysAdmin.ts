import Cookies from 'js-cookie';

export const FetchExcelSysAdmin = async (excelFile: File) => {
  try {
    const token = Cookies.get('access_token');

    const formData = new FormData();
    formData.append('file', excelFile);

    const response = await fetch(
      `http://localhost:8000/api/excels/sysadmin/`,
      {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorResponse = await response.json();
      throw new Error(
         JSON.stringify(errorResponse)
      );
    }
  } catch (error: any) {
    throw new Error('' + error);
  }
};

export const FetchHistorialExcelSysAdmin = async () => {
  try {
    const token = Cookies.get('tokennn');

    const response = await fetch(
      'http://localhost:8000/api/excels/sysadmin/',
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