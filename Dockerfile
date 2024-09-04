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
FROM python:3.12.5-bullseye

# Description: Dockerfile for the Django server application
LABEL author="Carlos E. Ferreyra - Google Cloud Platform - Cloud Run"

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create and set the working directory
WORKDIR /app

# Copy the requirements file and install system dependencies
COPY requirements.txt /app/
RUN apt-get update && \
    apt-get install -y default-libmysqlclient-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Set up Python virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend/ /app/

# Expose port
EXPOSE 8000

# Copy and set permissions for the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the entrypoint script to run migrations and start the server
ENTRYPOINT ["/entrypoint.sh"]
CMD ["sh","-c","gunicorn --bind 0.0.0.0:8000 --workers 1 --threads 8 --timeout 0 server.wsgi:application"]
