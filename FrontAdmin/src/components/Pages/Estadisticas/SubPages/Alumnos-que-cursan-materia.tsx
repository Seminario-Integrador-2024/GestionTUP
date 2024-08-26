import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListadoMaterias from './ListadoMaterias';
import MateriaDetalle from '../../../Subjects/MateriaDetalle';
import Programacion from './Programacion';

const AlumnosCursanMateria = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/alumnos-que-cursan-materia"
          element={<ListadoMaterias />}
        />
        <Route
          path="/alumnos-que-cursan-materia/:url"
          element={<MateriaDetalle />}
        />
      </Routes>
    </Router>
  );
};

export default AlumnosCursanMateria;
