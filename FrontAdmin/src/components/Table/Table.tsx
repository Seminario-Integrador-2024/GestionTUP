import React, { useState, useEffect, useMemo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable
} from 'material-react-table';
import { FetchAlumnos } from '../../API/DatosAlumnosV2.ts';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

interface PropsTable extends FlexProps {
  nombre: string;
  legajo: number;
  dni: number;
  estado: string;
  anio_ingreso: number;
}

function Table() {
  const [alumnos, setAlumnos] = useState<PropsTable[]>([]);

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

  const columns = useMemo<MRT_ColumnDef<PropsTable>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'APELLIDO Y NOMBRES',
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: alumnos, // Cambiar 'alumnos' a 'data'
    enableRowSelection: true,
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
      onClick: (event) => {
        console.info( row.original.dni ); //redireccionar a la ficha alumno/{dni}
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
