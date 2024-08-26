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

# import modules
# from tkinter import filedialog as fd

import pandas as pd

# get file by filedialog, http post or other method
# path: str = fd.askopenfilename(
#     title="Elija Archivo excel",
#     initialdir="/Users/carlosferreyra/Downloads",
#     filetypes=(("Excel files", "*.xls *.xlsx"), ("all files", "*.*")),
# )
raw_path = "/Users/carlosferreyra/Downloads/Cursantes 2 cuatrimestre.xlsx"





# functions definitions


import re


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


if __name__ == "__main__":
    # Call the main function
    pass
