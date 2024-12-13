import Cookies from 'js-cookie';

export const FetchPostPago = async (
    cuotas: any,
    montoInformado: number,
    comentario: string,
) => {
    try {
        const token = Cookies.get('tokennn');
        const dni = Cookies.get('dni');

        const response = await fetch(`http://localhost:8000/api/pagos/alumno/${dni}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({alumno:dni, cuotas , monto_informado:montoInformado, comentario}),
          });
      
          if (response.ok) {
            const data = await response.json();
            return data; //nose si lo dejo o que hago
          } else {
            const errorData = await response.json();
            throw new Error(
              `Error en la respuesta del servidor: ${errorData.message}`
            );
          }
        } catch (error) {
          console.error('Network error:', error);
          throw error;
        }

        
};


export const FetchGetCuotas = async (dni: number | undefined ) => {
    try {
        const token = Cookies.get('tokennn');
        if (!dni) {
            dni = parseInt(Cookies.get('dni') || '', 10);
        }
        const response = await fetch(`http://localhost:8000/api/cuotas/alumno/${dni}/impagas/`, {
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


export const FetchResumenPagos = async (dni: number | undefined ) => {
  try {
      const token = Cookies.get('tokennn');
      if (!dni) {
        dni = parseInt(Cookies.get('dni') || '', 10);
    }
      const response = await fetch(`http://localhost:8000/api/pagos/alumno/resumen_pagos/${dni}`, {
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
