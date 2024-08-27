import { useMemo } from 'react';
import { Flex, Image, FlexProps, Tooltip } from '@chakra-ui/react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  muiTableBodyRowProps
} from 'material-react-table';
import { data } from '../../API/DatosAlumnos';
//Import Material React Table Translations
import { MRT_Localization_ES } from 'material-react-table/locales/es';

interface PropsTable extends FlexProps {
  nombre: string;
  legajo: number;
  dni: number;
  situacion: string;
  anioIngreso: number;
}

function Table() {
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
        accessorKey: 'situacion',
        header: 'SITUACIÓN',
        enableHiding: true,
      },
      {
        accessorKey: 'anioIngreso',
        header: 'AÑO INGRESO',
        muiTableHeadCellProps: { style: { color: '#fffff' } },
        enableHiding: true,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
   
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
