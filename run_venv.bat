@echo off
setlocal

echo Construyendo la imagen Docker...
docker build -t django_imagen .

echo Ejecutando el contenedor Docker...
docker run -d -p 8000:8000 --name django_container django_imagen

echo Hecho.
endlocal
