import Cookies from 'js-cookie';

export const FetchPostPago = async (
    cuotas: any,
    montoInformado: number,
    archivo: File | null,   // Archivo a enviar
    comentario: string,
    nro_transferencia: number
) => {
    try {
        const token = Cookies.get('tokennn');
        const dni = Cookies.get('dni');
        // const dni = 36562786;  // Puedes obtener esto desde las cookies también

        // Crea un nuevo objeto FormData
        const formData = new FormData();
        formData.append('alumno', dni);
        formData.append('cuotas', cuotas);
        formData.append('monto_informado', montoInformado);
        formData.append('ticket', archivo); // El archivo
        formData.append('comentario', comentario);
        formData.append('nro_transferencia', nro_transferencia);

        console.log('FormData:', formData);
        console.log('Archivo:', archivo);
        console.log('Cuotas:', cuotas);
        console.log('Monto informado:', montoInformado);
        console.log('Comentario:', comentario);
        console.log('Nro transferencia:', nro_transferencia);

        // Realiza la solicitud fetch
        const response = await fetch(`http://localhost:8000/api/pagos/alumno/${dni}/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body: formData,
        });
        
        if (response.ok) {
            return await response.json(); 
        } else {
            const errorData = await response.json();
            throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};


export const FetchGetCuotas = async () => {
    try {
        const token = Cookies.get('tokennn');
        const dni = Cookies.get('dni');
        // const dni = 36562786;
        
        const response = await fetch(`http://localhost:8000/api/cuotas/alumno/${dni}/?limit=6&offset=0/`, {
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
