import Cookies from 'js-cookie';

export const FetchPostMateria = async (
    codigo_materia: number,
    anio_cursada: number,
    anio_plan: number,
    nombre:string,
    cuatrimestre: number
  ) => {
    try {
      const token = Cookies.get('access_token');

      const response = await fetch('http://localhost:8000/materias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ codigo_materia, anio_cursada, anio_plan, nombre, cuatrimestre }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;   //nose si lo dejo o que hago
      } else {
        const errorData = await response.json();
        throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
      }
    } catch (error) {
        console.error('Network error:', error);
    }
};

export const FetchMaterias = async () => {
    try {
      const token = Cookies.get('access_token');
  
      const response = await fetch(
        'http://localhost:8000/materias/',
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

export const FetchPutMateria = async (
  codigo_materia: number,
  anio_cursada: number,
  anio_plan: number,
  nombre:string,
  cuatrimestre: number
) => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch(`http://localhost:8000/materias/${codigo_materia}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ codigo_materia, anio_cursada, anio_plan, nombre, cuatrimestre }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;   //nose si lo dejo o que hago
    } else {
      const errorData = await response.json();
      throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
    }
  } catch (error) {
      console.error('Network error:', error);
  }
};

export const FetchDeleteMateria = async (codigo_materia: number) => {
  try {
    const token = Cookies.get('access_token');

    const response = await fetch(`http://localhost:8000/materias/${codigo_materia}/` , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return;   //nose si lo dejo o que hago
    } else {
      const errorData = await response.json();
      throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
    }
  }
  catch (error) {
    console.error('Network error:', error);
  }
}
  
