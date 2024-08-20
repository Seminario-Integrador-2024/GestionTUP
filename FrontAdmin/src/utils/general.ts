export function formatoFechaISOaDDMMAAAA(fechaISO: string): string {
    const fechaObjeto = new Date(fechaISO);
    const dia = String(fechaObjeto.getUTCDate()).padStart(2, "0");
    const mes = String(fechaObjeto.getUTCMonth() + 1).padStart(2, "0");
    const año = fechaObjeto.getUTCFullYear();
    return `${dia}/${mes}/${año}`;
  }
  
  export function formatoFechaISOaAAAAMMDD(fechaISO: string): string {
    const fechaObjeto = new Date(fechaISO);
    const dia = String(fechaObjeto.getDate() + 1).padStart(2, "0"); // Sumar 1 al día
    const mes = String(fechaObjeto.getMonth() + 1).padStart(2, "0");
    const año = fechaObjeto.getFullYear();
    return `${año}-${mes}-${dia}`;
  }
  
  interface Categoria {
    tipo: string;
    fecha: string; // Suponiendo que la fecha se almacena como string
  }