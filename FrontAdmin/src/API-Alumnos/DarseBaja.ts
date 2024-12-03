import Cookies from 'js-cookie';

export const solicitarBajaAlumno = async (dni: number, motivo: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/${dni}/solicitar-baja/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
      body: JSON.stringify({
        motivo: motivo,
      }),
    });

    if (response.ok) {
      console.log('Baja solicitada correctamente');
      return true;
    } else {
      console.error('Error al solicitar la baja');
      return false;
    }
  } catch (error) {
    console.error('Error al solicitar la baja:', error);
    return false;
  }
};

export const verficarBajaAlumno = async (dni: number) => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/${dni}/puede-solicitar-baja/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.puede_solicitar;
    } else {
      console.error('Error al verificar si el alumno puede solicitar la baja');
      return false;
    }
  } catch (error) {
    console.error('Error al verificar si el alumno puede solicitar la baja:', error);
    return false;
  }
};

export const bajasSolicitadas = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/bajas_solicitadas/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error al verificar si el alumno puede solicitar la baja');
      return false;
    }
  } catch (error) {
    console.error('Error al verificar si el alumno puede solicitar la baja:', error);
    return false;
  }
};

export const responderBaja = async (dni: number, respuesta: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/baja/${dni}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
      body: JSON.stringify({
        estado: respuesta,
      }),
      
    });

    if (response.ok) {
     
      return true;
    } else {
      
      return false;
    }
  } catch (error) {
    console.error( error);
    return false;
  }
};

export const dadosDeBaja = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/baja/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
      
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }	
  } catch (error) {
    console.error( error);
    return false;
  }
};