import Cookies from 'js-cookie';

export const FetchPostPago = async (
    cuotas: any,
    montoInformado: number,
    archivo: File | null,   // ver como mandar el archivo
    comentario: string
) => {
    try {
        const token = Cookies.get('tokennn');
        const dni = Cookies.get('dni');
        
        const response = await fetch(`http://localhost:8000/api/pagos/alumno/${dni}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                cuotas,
                montoInformado,
                archivo,
                comentario,
            }),
        });
        
        if (response.ok) {
            return;
        } else {
            const errorData = await response.json();
            throw new Error(
                `Error en la respuesta del servidor: ${errorData.message}`
            );
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

export const FetchGetCuotas = async () => {
    try {
        const token = Cookies.get('tokennn');
        //const dni = Cookies.get('dni');
        const dni = 36770618;
        
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

const cuotas = [
    {
        numero: 0,
        montoactual: 0,        
        fechaVencimiento: '2024-03-10',        
        valorpagado: 10000, 
        valorinformado: 0,        
        estado: "PAGADO",
    },
    {
        numero: 1,
        montoactual: 10000,        
        fechaVencimiento: '2024-03-10',        
        valorpagado: 0,        
        valorinformado: 5000,
        estado: "INFORMADO",
    },
    {
        numero: 2,
        montoactual: 10000,        
        fechaVencimiento: '2024-04-10',
        valorpagado: 0,
        valorinformado: 0,
        estado: "ADEUDADO",
    },
    {
        numero: 3,
        montoactual: 10000,        
        fechaVencimiento: '2024-05-10',
        valorpagado: 0,
        valorinformado: 0,
        estado: "ADEUDADO",
    },
    {
        numero: 4,
        montoactual: 10000,        
        fechaVencimiento: '2024-06-10',
        valorpagado: 0,
        valorinformado: 0,
        estado: "ADEUDADO",
    },
    {
        numero: 5,
        montoactual: 10000,        
        fechaVencimiento: '2024-07-10',
        valorpagado: 0,
        valorinformado: 0,
        estado: "ADEUDADO",
    }
];

export default cuotas;
    