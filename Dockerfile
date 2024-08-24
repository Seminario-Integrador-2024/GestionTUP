# copilot: give me as a comment, a list of all dockerfile syntax commands

# FROM: Specifies the base image to use
# LABEL: Adds metadata to the image
# HEALTHCHECK: Tells Docker how to test a container to check that it is still working
# ENV: Sets environment variables
# WORKDIR: Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
# COPY: Copies files or directories from a source on the host to a destination in the container
# RUN: Executes a command
# VOLUME: Creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers
# EXPOSE: Informs Docker that the container listens on the specified network ports at runtime
# CMD: Provides defaults for an executing container
# ENTRYPOINT: Allows you to configure a container that will run as an executable
# USER: Sets the user name or UID to use when running the image
# SHELL: Allows the default shell used for the shell form of commands to be overridden
# STOPSIGNAL: Sets the system call signal that will be sent to the container to exit
# ARG: Defines a variable that users can pass at build-time to the builder with the docker build command using the --build-arg <varname>=<value> flag
# ONBUILD: Adds a trigger instruction to the image that will be executed at a later time, when the image is used as the base for another build

# Use the official Python alpine image from the Docker Hub
FROM python:3.12.5-alpine3.20

# Description: Dockerfile for the Django server application
LABEL author="Carlos E. Ferreyra - Google Cloud Platform - Cloud Run"




# Set environment variables
ENV DJANGO_SETTINGS_MODULE=server.settings.base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Copy the entire backend directory
COPY backend/ /app

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt


# Create the volume mount point & give read/write access
RUN mkdir -p /app/mnt/my-bucket/ && chown -R 1001:1001 /app/mnt/my-bucket/

# Collect static files
RUN python manage.py collectstatic --noinput

# generate sql migrations for the chosen database
RUN python manage.py makemigrations

# Generate the OpenAPI schema
RUN python manage.py spectacular --color --file schema.yml --validate

# Expose port 8000 for the Django app
EXPOSE 8000

# Run the application
CMD ["sh", "-c", "python manage.py migrate && gunicorn server.wsgi:application --bind 0.0.0.0:8000"]
