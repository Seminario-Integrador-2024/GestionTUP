import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tabla from './Tabla';
import { FetchAlumnosMaterias } from '../../../../../API/Materias';

const ListadoAlumnosQueCursanMateria = () => {
  type Alumno = {
    dni: number;
    email: string;
    full_name: string;
    legajo: number;
    estado: string;
    anio_ingreso: number;
    telefono: string;
    tel_res: string;
    celular: string;
    gender: string;
  };
  const headers = ['Nombre', 'Legajo', 'DNI', 'Situación', 'Año Ingreso'];
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { codigo_materia } = useParams<{ codigo_materia: string }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (codigo_materia) {
          const codigo_materiaNumber = parseInt(codigo_materia); // Convierte a número
          const data = await FetchAlumnosMaterias(codigo_materiaNumber);
          setAlumnos(data);
          console.log(codigo_materia)
          console.log(data)
        }
      } catch (error) {
        setError(error);
        console.error('Error al obtener los datos', error);
      } finally {
        setLoading(false);
      }
    };

    if (codigo_materia) {
      fetchData();
    }
  }, [codigo_materia]); // Incluye `dni` como dependencia

  return <Tabla headers={headers} data={alumnos} />;
};

export default ListadoAlumnosQueCursanMateria;
