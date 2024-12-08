import Cookies from 'js-cookie';

export const getInhabilitaciones = async (limit: number, offset: number) => {
    try {
        const token = Cookies.get('tokennn');
        const response = await fetch(`http://localhost:8000/api/alumnos/inhabilitados?limit=${limit}&offset=${offset}` , {
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


export const getAlumnosaInhabilitar = async () => {
    try {
        const token = Cookies.get('tokennn');
        const response = await fetch(`http://localhost:8000/api/alumnos/alumnos-a-inhabilitar` , {
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

export const alumnosaHabilitar = async () => {
    const token = Cookies.get('tokennn');
    const response = await fetch('http://localhost:8000/api/alumnos/alumnos-a-habilitar', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
}


