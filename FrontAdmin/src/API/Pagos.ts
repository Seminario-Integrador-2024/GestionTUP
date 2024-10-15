import Cookies from 'js-cookie';

export const GetPagos = async (year?: string, month?: string) => {

    const token = Cookies.get('tokennn');
    const url = `http://localhost:8000/api/estadisticas/pagos_mes/${year}/${month}/`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(
            `Error en la respuesta del servidor: ${errorData.message}`
        );
    }
};

export default GetPagos;