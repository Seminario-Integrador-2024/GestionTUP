import Cookies from 'js-cookie';


export const actualizarpagos = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:8000/api/pagos/actualizar-pagos', {
        method: 'POST',
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
};

export const actualizarinhabilitaciones = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:8000/api/alumno/actualizar-inhabilitaciones', {
        method: 'POST',
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
};

export const actualizarmaterias = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:8000/api/materias/actualizar-materias', {
        method: 'POST',
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
};

export const actualizarcuotas = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:8000/api/cuotas/actualizar-cuotas', {
        method: 'POST',
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
};
