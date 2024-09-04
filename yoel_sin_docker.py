import os

from dotenv import load_dotenv

load_dotenv()
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings.base")

command = "cd backend &&"

command += "python manage.py makemigrations &&"

command += "python manage.py migrate &&"

command += "python manage.py runserver"

os.system(command)
