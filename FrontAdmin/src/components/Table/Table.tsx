import React, { useState, useEffect, useMemo } from 'react';
import { Flex, FlexProps, Spinner,Box  } from '@chakra-ui/react';
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
  estado_academico: string;
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
    Cell: ({ cell }) => (
      <span>{new Intl.NumberFormat('es-ES').format(cell.getValue<number>())}</span>
    ),
  },
  {
    accessorKey: 'estado_academico',
    header: 'ESTADO ACADÉMICO',
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
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciar carga
        const data = await FetchAlumnos();
   
        setAlumnos(data.results);
        setLoading(false); // Iniciar carga
      } catch (error) {
        console.error('Error al obtener los datos', error);
        setLoading(false); // Finalizar carga
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
  // Renderizar el spinner si está cargando
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" mt="40px">
        <Spinner
          w="35px"
          h="35px"
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  } 

  // Renderizar la tabla una vez que se hayan cargado los datos
  return <MaterialReactTable table={table} />;
}

export default Table;
