import React, { useState, useEffect, useMemo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable
} from 'material-react-table';
import { FetchAlumnos } from '../../API/DatosAlumnosV2.ts';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useNavigate } from 'react-router-dom';

let tableHeaders = [
  {
    accessorKey: 'apellido',
    header: 'APELLIDO',
    enableHiding: true,
  },
  {
    accessorKey: 'nombre',
    header: 'NOMBRES',
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
]

interface PropsTable extends FlexProps {
  nombre: string;
  legajo: number;
  dni: number;
  estado: string;
  anio_ingreso: number;
  boolEnableRowSelection: bool;
  tableHeaders: array;
}

function Table( {boolEnableRowSelection }: PropsTable ) {
  const [alumnos, setAlumnos] = useState<PropsTable[]>([]);
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

  const columns = useMemo<MRT_ColumnDef<PropsTable>[]>(
    () => tableHeaders,[]
  );

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
      onClick: (event) => {
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
