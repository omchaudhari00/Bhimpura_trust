import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = os.getenv("DEBUG", "False").lower() == "true"

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "django-insecure-dev-fallback-key-for-local-testing"
    else:
        from django.core.exceptions import ImproperlyConfigured
        raise ImproperlyConfigured("The SECRET_KEY environment variable is required in production.")

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "core_api.apps.CoreApiConfig",
    "temple_project_app",
    "donors_app",
    "analytics_app",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
    "analytics_app.middleware.HomepageVisitMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = "core_api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [],
        },
    }
]

WSGI_APPLICATION = "core_api.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    if DEBUG:
        MONGODB_URI = "mongodb://localhost:27017"
    else:
        from django.core.exceptions import ImproperlyConfigured
        raise ImproperlyConfigured("The MONGODB_URI environment variable is required in production.")

MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME")
if not MONGODB_DB_NAME:
    if DEBUG:
        MONGODB_DB_NAME = "bhimpura_trust"
    else:
        from django.core.exceptions import ImproperlyConfigured
        raise ImproperlyConfigured("The MONGODB_DB_NAME environment variable is required in production.")

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = os.getenv("AWS_S3_REGION_NAME")

if not DEBUG:
    missing_aws = [
        var for var, val in {
            "AWS_ACCESS_KEY_ID": AWS_ACCESS_KEY_ID,
            "AWS_SECRET_ACCESS_KEY": AWS_SECRET_ACCESS_KEY,
            "AWS_STORAGE_BUCKET_NAME": AWS_STORAGE_BUCKET_NAME,
            "AWS_S3_REGION_NAME": AWS_S3_REGION_NAME,
        }.items() if not val
    ]
    if missing_aws:
        from django.core.exceptions import ImproperlyConfigured
        raise ImproperlyConfigured(f"The following AWS environment variables are missing in production: {', '.join(missing_aws)}")

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "core_api.authentication.AdminJWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "SIGNING_KEY": SECRET_KEY,
}

HOMEPAGE_TRACK_PATH = os.getenv("HOMEPAGE_TRACK_PATH", "/api/analytics/track/")
