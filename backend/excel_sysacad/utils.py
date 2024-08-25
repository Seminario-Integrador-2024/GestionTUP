"""
Utils for excel_sysacad app
"""

import os
from operator import inv
from tkinter import filedialog as fd
from typing import Any

import pandas as pd

# import django lazy translation
from django.utils.translation import gettext_lazy as _

# Validar formato archivo sysacad xls
# 0. recibir archivo sysacad via http post
# 1. abrir archivo sysacad
path: str = fd.askopenfilename(
    title="Elija Archivo excel",
    initialdir="/Users/carlosferreyra/Downloads",
    filetypes=(("Excel files", "*.xls *.xlsx"), ("all files", "*.*")),
)
# 2. leer archivo sysacad via pandas
# pandas documentation: https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html
col_header = 6
df: pd.DataFrame = pd.read_excel(
    io=path,
    header=col_header - 1,
    # skiprows=5,
    engine="openpyxl",
)

"""
3.0 validar los campos del archivo sysacad
_reglas: 

3.0.2. nombre y apellido no vacíos, solo letras, espacios,letra 'ñ', y acentos en vocales; 
3.0.3 email válido;
3.0.4 celular de 10 dígitos numerico, 
3.0.5 teléfono de 7 a 8 dígitos numerico
3.0.6 
3.0.7 ingreso y año de 4 digitos numerico
3.0.8 esp 2 digitos numerico
3.0.9 leg 5 digitos numerico
3.1 si algun campo no es válido, indicar fila y columna del error o errores
"""


# receive a dictionary of dataframe rows


def dni_validation(dni_rows: dict) -> list[Any] | bool:
    _(
        message="""
    Validates the 'DNI' (Documento Nacional de Identidad) rows.

    Args:
        dni_rows (dict): A dictionary containing the DNI rows from a pandas dataFrame column.

    Returns:
        list[Any] | bool: A list of invalid rows or True if all rows are valid.
    """
    )

    invalid_rows: list[Any] = []

    for dni in dni_rows.values():
        if not dni:  # empty string
            invalid_rows.append(dni)
        elif not dni.isnumeric():  # not a number
            invalid_rows.append(dni)
        elif int(dni) <= 0:  # not a positive number
            invalid_rows.append(dni)
        elif len(dni) not in (7, 8):  # not between 7 and 8 digits
            invalid_rows.append(dni)

    if invalid_rows:
        return invalid_rows
    return True


def validate_date_column(
    date_rows: pd.DataFrame, format="%Y-%m-%d"
) -> list[Any] | bool:
    """
    Validate the date rows.

    Args:
        date_rows (pd.DataFrame): A DataFrame containing the date rows.
        format (str): The date format to validate against.

    Returns:
        list[Any] | bool: A list of invalid rows or True if all rows are valid.
    """

    invalid_rows: list[Any] = []
    for row in date_rows:
        try:
            pd.to_datetime(row, format=format)
        except ValueError:
            invalid_rows.append(row)
    if invalid_rows:
        return invalid_rows
    return True


def validate_excel(data: pd.DataFrame = df) -> list[Any] | bool:
    __doc__ = _(
        message="""Validates the data in a DataFrame against a set of rules.
    Validates the data in a DataFrame against a set of rules.

    Args:
        df (pd.DataFrame): The DataFrame to validate.

    Returns:
        list[Any] | bool: A list of invalid rows or False if all rows are valid.
    """
    )

    invalid_rows: list[Any] = []

    # Individual validation functions
    # Call individual validation functions
    # try/catch of each validation function
    # if any validation function returns invalid rows, append to invalid_rows list

    return invalid_rows


# 3.0.1. DNI numerico de 7 a 8 dígitos;


"""
cargar archivo sysacad xls en la bbdd
0. recibir archivo sysacad validado
1. abrir archivo sysacad
2. leer archivo sysacad, registro a registro, via pandas
3. insertar registros a la bbdd:
4. para cada registro:
4.1. si el alumno ya existe en la bbdd (DNI), ignorarlo.
4.2 si el alumno no existe en la bbdd, agregarlo.
4.3 idem 4.1 y 4.2 para las materias (Materia) .
4.4 idem 4.1 y 4.2 para Materia_Alumno(DNI,Materia,Año).
5 reporte de registros duplicados de Materia_Alumno
6 reporte de registros agregados de Materia_Alumno
"""
