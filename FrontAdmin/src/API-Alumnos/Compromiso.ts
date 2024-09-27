import Cookies from 'js-cookie'
// los dni son la mama de lo hardcodeado

export const FetchCompromisos = async () => {
 try {
    const token = Cookies.get('tokennn');
    const dni = Cookies.get('dni');
   
    const response = await fetch(`http://localhost:8000/api/firmas/firmas-de-alumno/${dni}/`, {
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

export const FetchUltimoCompromiso = async () => {
    try {
        const token = Cookies.get('tokennn');
        const response = await fetch(`http://localhost:8000/api/ultimo-compromiso-de-pago/`, {
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

export const FirmarCompromiso = async () => {
    try {
        const token = Cookies.get('tokennn');
        const dni = Cookies.get('dni')
        
        const response = await fetch(`http://localhost:8000/api/firmas/firmar-compromiso/${dni}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
        });
        if (response.ok) {
                return;
        } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            throw new Error('Network error: ' + error);
        }
};

