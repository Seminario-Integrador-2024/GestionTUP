import React, { useState, useEffect, useMemo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { FetchAlumnos } from '../../API/DatosAlumnosV2.ts';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useNavigate } from 'react-router-dom';

import data from '../../API/DatosAlumnos.ts'; //simulando que es una api

// Definir un tipo para los datos de los alumnos
interface Alumno {
  fullname: string;
  legajo: number;
  dni: number;
  situacion: string;
  anioIngreso: number;
}

const tableHeaders: MRT_ColumnDef<Alumno>[] = [
  {
    accessorKey: 'full_name',
    header: 'APELLIDO Y NOMBRE',
    enableHiding: true,
  },
  {
    accessorKey: 'legajo',
    header: 'LEGAJO',
    enableHiding: true,
  },
  {
    accessorKey: 'dni',
    header: 'DNI',
    enableHiding: true,
  },
  {
    accessorKey: 'estado',
    header: 'SITUACIÓN',
    enableHiding: true,
  },
  {
    accessorKey: 'anio_ingreso',
    header: 'AÑO INGRESO',
    muiTableHeadCellProps: { style: { color: '#fffff' } },
    enableHiding: true,
  },
];

interface PropsTable extends FlexProps {
  boolEnableRowSelection: boolean; 
}

function Table({ boolEnableRowSelection }: PropsTable) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]); //para la llamada a la api del back
  //const [alumnos, setAlumnos] = useState<Alumno[]>(data); // Usa el arreglo importado directamente
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAlumnos();
        setAlumnos(data.results); 
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    };

    fetchData();
  }, []);


  const columns = useMemo<MRT_ColumnDef<Alumno>[]>(() => tableHeaders, []);

  const table = useMaterialReactTable({
    columns,
    data: alumnos,
    enableRowSelection: boolEnableRowSelection,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    localization: MRT_Localization_ES,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`${row.original.dni}`);
      },
      sx: {
        cursor: 'pointer',
      },
    }),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
