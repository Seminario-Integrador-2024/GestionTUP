"""
Utils for excel_sysacad app

A. Validar formato archivo sysacad xls
0. recibir archivo sysacad via http post
1. abrir archivo sysacad
2. leer archivo sysacad via pandas
3.0 validar los campos del archivo sysacad
_reglas: 

3.0.1. DNI numerico de 7 a 8 dígitos;
3.0.2. nombre y apellido no vacíos, solo letras, espacios,letra 'ñ', y acentos en vocales; 
3.0.3 email válido;
3.0.4 celular de 10 dígitos numerico, 
3.0.5 teléfono de 7 a 8 dígitos numerico
3.0.6 
3.0.7 ingreso y año de 4 digitos numerico
3.0.8 esp 2 digitos numerico
3.0.9 leg 5 digitos numerico
3.1 si algun campo no es válido, indicar fila y columna del error o errores

B. cargar archivo sysacad xls en la bbdd
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

import json
import re
from typing import Callable

import pandas as pd
from django.db.models import Model
from sqlalchemy import Boolean

# functions definitions


def validate_excel_file(data: pd.DataFrame) -> pd.DataFrame:
    """
    Validates the data in a DataFrame against a set lambda functions.

    Args:
        data (pd.DataFrame): The DataFrame to validate.

    Returns:
        dict: A dict containing the invalid rows if any, sorted by row number.
    """
    # compile the regex patterns
    regex_extension = r"^\s*0\s*$"
    regex_esp = r"^\s*34\s*$"
    regex_ingr = r"^\s*20\d\d\s*$"
    regex_anio = regex_ingr
    regex_legajo = r"^[\s]*[1-9]\d{4}[\s]*$"
    regex_dni = r"^\s*\d{7,8}\s*$"
    regex_nombres = r"[\s]*([a-zàáèéìíòóùúñçA-ZÀÁÈÉÌÍÒÓÙÚÑ]+[\s]*)+"
    regex_ap_no = regex_nombres + r"[\s]*,?[\s]*" + regex_nombres
    regex_comision = r"^\s*\d\s*$"
    regex_materia = r"^\s*\d\d\d\s*$"
    regex_no_ma = regex_nombres
    regex_estado = r"^\s*Inscripto\s*$"
    regex_recursa = r"^\s*(Si|No)\s*$"
    regex_mail = r"([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)?"
    regex_telefono = r"((\d{0,4}-?)?\d{6,10})?"
    regex_notas = r"([\s]*[1-9]([\.,]\d{1,2})?|10[\s]*)?"
    regex_activo = r"^\s*Activo\s*$"
    # Define the rules
    rules: dict[str, Callable] = {
        "Extensión": lambda x: bool(re.compile(regex_extension).match(str(x))),
        "Esp.": lambda x: bool(re.compile(regex_esp).match(str(x))),
        "Ingr.": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Año": lambda x: bool(re.compile(regex_anio).match(str(x))),
        "Legajo": lambda x: bool(re.compile(regex_legajo).match(str(x))),
        "Documento": lambda x: bool(re.compile(regex_dni).match(str(x))),
        "Apellido y Nombres": lambda x: bool(
            re.match(
                regex_ap_no,
                str(x),
            )
        ),
        "Comisión": lambda x: bool(re.compile(regex_comision).match(str(x))),
        "Materia": lambda x: bool(re.compile(regex_materia).match(str(x))),
        "Nombre de materia": lambda x: bool(
            re.match(
                regex_no_ma,
                str(x),
            )
        ),
        "Estado": lambda x: bool(re.compile(regex_estado).match(str(x))),
        "Recursa": lambda x: bool(re.compile(regex_recursa).match(str(x))),
        "Cant.": lambda x: isinstance(x, int) and x >= 0,
        "Mail": lambda x: re.compile(regex_mail).match(str(x)),
        "Celular": lambda x: bool(re.compile(regex_telefono).match(str(x))),
        "Teléfono": lambda x: bool(re.compile(regex_telefono).match(str(x))),
        "Tel. Resid": lambda x: pd.isna(x)
        or bool(re.compile(regex_telefono).match(str(x))),
        "Nota 1": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 2": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 3": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 4": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 5": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 6": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota 7": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nota Final": lambda x: bool(re.compile(regex_notas).match(str(x))),
        "Nombre": lambda x: bool(re.compile(regex_activo).match(str(x))),
    }

    # Validate the data and track errors
    def validate_row(row):
        errors = {}
        for col, rule in rules.items():
            if not rule(row[col]):  # If the rule is not satisfied
                errors[col] = row.name  # Index of the row
        return errors

    invalid_rows = data.apply(
        validate_row, axis=1
    )  # Apply the validation to each row and store the errors
    invalid_rows = (  # Convert the errors to a DataFrame with the column names and row numbers
        pd.DataFrame(
            invalid_rows.tolist()  # Convert the list of dictionaries to a list of lists
        )  # Convert the list of dictionaries to a DataFrame
        .stack()  # Stack the columns to get a multi-index DataFrame
        .reset_index(
            level=1
        )  # Reset the index to get the column names as a column instead of the index
        .rename(columns={0: "row"})  # Rename the column to "row"
    )  # Convert the multi-index DataFrame to a single-index DataFrame
    invalid_rows.columns = [
        "columna",
        "error_en_fila",
    ]
    return invalid_rows.pivot(
        index="error_en_fila", columns="columna", values="columna"
    )


# cargar archivo sysacad xls en la bbdd

from django.db import transaction


# Define table definitions with column lists
# table_definitions = {
#     "alumnos_Materia": ["Materia", "Nombre de materia"],
#     "alumnos_Alumno": [
#         "Mail",
#         "Apellido y Nombres",
#         "Legajo",
#         "Documento",
#         "Nombre",
#     ],
#     "alumnos_MateriaAlumno": ["Materia", "Documento", "Año"],
# ... add more tables and their columns here
# }
# Get the database connection string from the settings
def load_data(data: pd.DataFrame):
    """
    Load Excel data into the database.

    Args:
    - data (pd.DataFrame): The data to load into the database.
    - models (dict[str, Model]): A dictionary containing the models to load the data into.
    """
    # models definitions
    from alumnos.models import Alumno
    from materias.models import Materia, MateriaAlumno

    df_records = data.to_dict()
    # iterate over the rows
    for index, row in df_records.items():
        # create the Alumno instance
        alumno = Alumno(
            dni=row["Documento"],
            nombre=row["Apellido y Nombres"],
            legajo=row["Legajo"],
            email=row["Mail"],
            celular=row["Celular"],
            telefono=row["Teléfono"],
            telefono_resid=row["Tel. Resid"],
        )
        # create the Materia instance
        materia = Materia(
            codigo_materia=row["Materia"],
            nombre=row["Nombre de materia"],
        )
        # create the MateriaAlumno instance
        materia_alumno = MateriaAlumno(
            id_materia=row["Materia"],
            id_alumno=row["Documento"],
            offrc=0,
            atendnc=0,
        )
        # save the instances
        with transaction.atomic():
            alumno.save()
            materia.save()
            materia_alumno.save()


if __name__ == "__main__":
    # Call the main function

    # import modules
    import os
    from tkinter import filedialog as fd

    # get file by filedialog, http post or other method
    # path: str = fd.askopenfilename(
    #     title="Elija Archivo excel a validar",
    #     initialdir=os.getcwd(),
    #     filetypes=(("Excel files", "*.xls *.xlsx"), ("all files", "*.*")),
    # )
    raw_path = "/Users/carlosferreyra/Downloads/Cursantes 2 cuatrimestre.xlsx"

    # read the file
    COL_HEADER = 6  # header row with column names in the excel file
    df: pd.DataFrame = pd.read_excel(
        # io=path,
        io=raw_path,
        # header=COL_HEADER - 1,
        names=[
            "Extensión",
            "Esp.",
            "Ingr.",
            "Año",
            "Legajo",
            "Documento",
            "Apellido y Nombres",
            "Comisión",
            "Materia",
            "Nombre de materia",
            "Estado",
            "Recursa",
            "Cant.",
            "Mail",
            "Celular",
            "Teléfono",
            "Tel. Resid",
            "Nota 1",
            "Nota 2",
            "Nota 3",
            "Nota 4",
            "Nota 5",
            "Nota 6",
            "Nota 7",
            "Nota Final",
            "Nombre",
        ],
        skiprows=COL_HEADER - 1,
        engine="openpyxl",
    )
    # make index start at 6
    df.index = df.index + COL_HEADER + 1
    data_dict = df.to_dict()
    # arows = {
    #     row_index: {column: values[row_index] for column, values in data_dict.items()}
    #     for row_index in data_dict[list(data_dict.keys())[0]].keys()
    # }
    result: pd.DataFrame = validate_excel_file(df)
    # x = 2
    # for index, columns in arows.items():
    #     if x != 0:
    #         for column, rows in columns.items():
    #             print(f"{index}: {column} -> {rows}\t\n\n")
    #         x -= 1
    #     else:
    #         break
    print(result)
