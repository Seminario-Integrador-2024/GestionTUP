"""
Utils for excel_sysacad app
"""

"""
Validar formato archivo sysacad xls
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
"""


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
