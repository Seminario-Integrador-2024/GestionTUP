# Use the official Python image from the Docker Hub
FROM python:3.12-slim-bullseye

# Set environment variables

ENV DJANGO_SETTINGS_MODULE=server.settings.base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire backend directory
COPY backend/ .

# mount GCP Bucket to the container in cloud run
VOLUME [ "/mnt/my-bucket" ]

# Collect static files
RUN python manage.py collectstatic --noinput

# Make migrations and migrate the database
RUN python manage.py makemigrations
RUN python manage.py migrate

# Generate the OpenAPI schema
RUN python manage.py spectacular --color --file schema.yml --validate

# Expose port 8000 for the Django app
EXPOSE 8000

# Run the application
CMD ["gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8000"]