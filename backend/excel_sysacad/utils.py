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

import re
from time import sleep

import pandas as pd
from django.conf import settings


# functions definitions
def get_connection_string():

    return settings.DATABASES["default"]["ENGINE"]


def validate_excel(data: pd.DataFrame) -> pd.DataFrame:
    """
    Validates the data in a DataFrame against a set of rules.

    Args:
        data (pd.DataFrame): The DataFrame to validate.

    Returns:
        bool | pd.DataFrame: A DataFrame containing the invalid rows if any, or True if all rows are valid.
    """

    # Define the rules
    rules = {
        "Extensión": lambda x: isinstance(x, int) and len(str(x)) == 1 and x >= 0,
        "Esp.": lambda x: isinstance(x, int) and len(str(x)) == 2 and x == 34,
        "Ingr.": lambda x: isinstance(x, int) and len(str(x)) == 4 and x > 0,
        "Año": lambda x: isinstance(x, int) and len(str(x)) == 4 and x > 0,
        "Legajo": lambda x: isinstance(x, int) and len(str(x)) == 5 and x > 0,
        "Documento": lambda x: isinstance(x, int) and 7 <= len(str(x)) <= 8 and x > 0,
        # check if name and surname are not empty and only contain letters, spaces, 'ñ' and accents and reverse accents
        "Apellido y Nombres": lambda x: isinstance(x, str)
        and bool(
            re.match(r"^[A-ZÑa-zñ'ÁÉÍÓÚáéíóú ]+(,[A-ZÑa-zñ'ÁÉÍÓÚáéíóú ]+)?$", str(x))
        ),
        "Comisión": lambda x: isinstance(x, int) and len(str(x)) == 1 and x > 0,
        "Materia": lambda x: isinstance(x, int) and len(str(x)) == 3 and x > 0,
        "Nombre de materia": lambda x: bool(
            re.match(r"^[A-ZÑa-zñÁÉÍÓÚáéíóú ]+$", str(x))
        ),
        "Estado": lambda x: x == "Inscripto",
        "Recursa": lambda x: isinstance(x, str) and x in ["Si", "No"],
        "Cant.": lambda x: isinstance(x, int) and x >= 0,
        "Mail": lambda x: pd.isna or re.match(r"^[^@]+@[^@]+\.[^@]+$", str(x)),
        # check if cell is empty or has a valid 10 digit phone number
        # give me all vocal with strange accents like this 'è'
        "Celular": lambda x: pd.isna(x)
        or (isinstance(x, float) and (7 <= len(str(x)) <= 13) and x > 0),
        "Teléfono": lambda x: pd.isna(x)
        or (isinstance(x, int) and (7 <= len(str(x)) <= 13) and x > 0),
        "Tel. Resid": lambda x: pd.isna(x)
        or (isinstance(x, int) and (7 <= len(str(x)) <= 13) and x > 0),
        "Nota 1": lambda x: 0 <= x <= 10,
        "Nota 2": lambda x: 0 <= x <= 10,
        "Nota 3": lambda x: 0 <= x <= 10,
        "Nota 4": lambda x: 0 <= x <= 10,
        "Nota 5": lambda x: 0 <= x <= 10,
        "Nota 6": lambda x: 0 <= x <= 10,
        "Nota 7": lambda x: 0 <= x <= 10,
        "Nota Final": lambda x: 0 <= x <= 10,
        "Nombre": lambda x: x == "Activo",
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
    )
    invalid_rows.columns = [
        "columna",
        "error_en_fila",
    ]  # Rename the columns to "column" and "row" respectively
    return invalid_rows.pivot(
        index="error_en_fila", columns="columna", values="columna"
    )


# cargar archivo sysacad xls en la bbdd

from django.db import transaction
from sqlalchemy import create_engine


def load_excel(data: pd.DataFrame) -> pd.DataFrame:
    """
    Loads the data into the database, handling multiple tables and transactions.
    Returns a DataFrame containing duplicate rows found in the existing database.

    Args:
        data (pd.DataFrame): a DataFrame containing the data to load into the database.
    """

    # Get the connection string from Django settings
    engine = create_engine(get_connection_string())

    # Define table definitions with column lists
    table_definitions = {
        "alumnos_Materia": ["Materia", "Nombre de materia"],
        "alumnos_Alumno": [
            "Mail",
            "Apellido y Nombres",
            "Legajo",
            "Documento",
            "Nombre",
        ],
        "alumnos_MateriaAlumno": ["Materia", "Documento", "Año"],
        # ... add more tables and their columns here
    }

    # Initialize an empty DataFrame to store duplicate rows
    duplicates = pd.DataFrame()

    # Use a transaction to ensure all table updates are committed together
    with transaction.atomic():
        # Iterate over each table and its corresponding columns
        for table_name, columns in table_definitions.items():
            # Filter the DataFrame for the current table's columns
            table_data = data[columns]

            # Check for duplicate rows in the existing database table
            existing_data = pd.read_sql_table(table_name, con=engine)
            duplicate_rows = pd.merge(table_data, existing_data, how="inner")

            # Append the duplicate rows to the duplicates DataFrame
            duplicates = pd.concat([duplicates, duplicate_rows])

            # Load the data into the database table, excluding duplicates
            table_data = table_data.drop_duplicates(keep=False)
            table_data.to_sql(table_name, con=engine, if_exists="append", index=False)
    return duplicates


if __name__ == "__main__":
    # Call the main function

    # import modules
    import os
    from tkinter import filedialog as fd

    # get file by filedialog, http post or other method
    path: str = fd.askopenfilename(
        title="Elija Archivo excel a validar",
        initialdir=os.getcwd(),
        filetypes=(("Excel files", "*.xls *.xlsx"), ("all files", "*.*")),
    )
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

    result = validate_excel(df)
    # return the data as json
    if not result.empty:
        print("generando json con filas invalidas\n")
        sleep(3)
        print(result.to_json(orient="index"), end="\n")
        sleep(3)
        name = "invalid_rows.json"
        result.to_json(orient="index", path_or_buf=name)
        print(f"json guardado en {os.getcwd()}/{name}")
    else:
        print("All rows are valid.")
