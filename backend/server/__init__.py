from django.conf import settings

if settings.DATABASES["default"]["ENGINE"] == "django.db.backends.mysql":
    # import pymysql

    # pymysql.install_as_MySQLdb()
    pass
