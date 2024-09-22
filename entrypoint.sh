#!/bin/bash -x

echo "Making migrations..."
python manage.py makemigrations || exit 1

# Apply Django migrations
echo "Applying database migrations..."
python manage.py migrate || exit 1

# Create a superuser
echo "Creating superuser..."
python create_superuser.py || exit 1

# Collect static files (optional, depends on your setup)
# echo "Collecting static files..."
# python manage.py collectstatic --noinput

# Start the Django application
exec "$@"
