"""
Django settings for sgae project.

Generated by 'django-admin startproject' using Django 3.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
# import environ #aws remove
# env = environ.Env() #aws remove
# environ.Env.read_env() #aws remove

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY =env('SECRET_KEY') #aws remove
SECRET_KEY = os.environ['SECRET_KEY'] #aws include

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = ["projeto-sgae-dev.us-east-1.elasticbeanstalk.com"]
ALLOWED_HOSTS = ['env-sgae4.eba-npvnqzqf.us-east-1.elasticbeanstalk.com', 
                 'backend.sgae501.com.br', '127.0.0.1', 'localhost']

CORS_ALLOW_ALL_ORIGINS = True
CORS_ORIGIN_ALLOW_ALL = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders",
    'rest_framework',
    'rest_framework.authtoken',    
    'djoser',
    'main',    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sgae.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sgae.wsgi.application'

AUTH_PASSWORD_VALIDATORS  = []

DJOSER = {
    # "USER_ID_FIELD": "username",
    # "LOGIN_FIELD": "email",
    "SEND_ACTIVATION_EMAIL": True,
    "ACTIVATION_URL": "requestActivate/{uid}/{token}",
    'SERIALIZERS': {
        'token_create': 'main.serializers.CustomTokenCreateSerializer',
    },
}

SITE_NAME = "SGAE-Sistema de Gerenciamento de Ambientes de Ensino - Senai Roberto Mange"

#send djoser com aws
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ['EMAIL_HOST']  #aws include
# EMAIL_HOST = env('EMAIL_HOST') #aws remove
EMAIL_PORT = os.environ['EMAIL_PORT'] #aws include
# EMAIL_PORT = env('EMAIL_PORT') #aws remove
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ['EMAIL_HOST_USER'] #aws include
# EMAIL_HOST_USER = env('EMAIL_HOST_USER') #aws remove
EMAIL_HOST_PASSWORD = os.environ['EMAIL_HOST_PASSWORD'] #aws include
# EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD') #aws remove
DEFAULT_FROM_EMAIL = os.environ['DEFAULT_FROM_EMAIL'] #aws include
# DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL') #aws remove


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {    
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    'default': {
        'ENGINE': os.environ['DB_ENGINE'], #aws include
        # 'ENGINE': env('DB_ENGINE'), #aws remove 
        'NAME': os.environ['DB_NAME'], #aws include
        # 'NAME': env('DB_NAME'), #aws remove 
        'USER': os.environ['DB_USER'], #aws include
        # 'USER': env('DB_USER'), #aws remove 
        'PASSWORD': os.environ['DB_PSWD'], #aws include
        # 'PASSWORD': env('DB_PSWD'), #aws remove 
        'HOST': os.environ['DB_HOST'], #aws include
        # 'HOST': env('DB_HOST'), #aws remove 
        'PORT': os.environ['DB_PORT'], #aws include
        # 'PORT': env('DB_PORT'), #aws remove 
    }

}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT= 'static'

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {

'DEFAULT_PERMISSION_CLASSES': [
    #'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly’,
    'rest_framework.permissions.AllowAny',
    # 'rest_framework.permissions.IsAuthenticated',
    ],
'DEFAULT_AUTHENTICATION_CLASSES':[
        'rest_framework.authentication.TokenAuthentication'
    ],

}

