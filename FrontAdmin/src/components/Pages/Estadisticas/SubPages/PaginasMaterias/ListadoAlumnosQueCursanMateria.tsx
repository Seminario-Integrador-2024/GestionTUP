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
  const [error, setError] = useState<string | null>(null);
  const { codigo_materia } = useParams<{ codigo_materia: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (codigo_materia) {
          const codigo_materiaNumber = parseInt(codigo_materia);
          const data = await FetchAlumnosMaterias(codigo_materiaNumber);
          setAlumnos(data.results);
        }
      } catch (error: any) {
        setError(error.message || 'Error al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [codigo_materia]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (alumnos.length === 0) return <p>No hay alumnos inscritos en esta materia.</p>;

  return <Tabla headers={headers} data={alumnos} />;
};

export default ListadoAlumnosQueCursanMateria;
