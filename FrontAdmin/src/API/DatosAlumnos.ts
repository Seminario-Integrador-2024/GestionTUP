// Definir el tipo de datos para los alumnos
export interface Alumno {
  apellido: string;
  nombre: string;
  legajo: number;
  dni: number;
  situacion: string;
  anioIngreso: number;
}

// Datos de ejemplo
const data: Alumno[] = [
  {
    apellido: 'Gonzalez',
    nombre: 'Juan',
    legajo: 12345,
    dni: 98765432,
    situacion: 'Activo',
    anioIngreso: 2020,
  },
  {
    apellido: 'Melgarejo Roma',
    nombre: 'Facundo',
    legajo: 12345,
    dni: 42098698,
    situacion: 'Activo',
    anioIngreso: 2020,
  },
];

export default data;
