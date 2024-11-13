import Cookies from 'js-cookie';

export const solicitarBajaAlumno = async (dni: number, motivo: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/alumnos/baja/${dni}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokennn')}`,
      },
      body: JSON.stringify({
        dni: dni,
        motivo: motivo,
      }),
    });

    if (response.ok) {
     
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
