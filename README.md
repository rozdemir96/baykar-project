
# Baykar - Django ile İha Kiralama Projesi

### Projenin lokalinizde çalışması için gerekli olan yüklemeler
```bash
  pip install django
```
```bash
  pip install djangorestframework
```
```bash
  pip install psycopg2
```
### Projenin veritabanı bağlantısı
```javascript
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'IHA_DEV',
        'USER': 'ihaDevUser',
        'PASSWORD': 'Dev_PaSSw0rd',
        'HOST': 'localhost',
        'PORT': '5435',
    }
}
```
### Projenin docker ile çalıştırılması
```bash
  docker-compose -f docker-compose-dev.yml up -d
```
### Model (veritabanı tablolarını) oluşturma adımları
```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```
### Projeyi lokalinizde çalıştırmak için gerekli komutlar
```bash
python manage.py runserver
```
### Projenin test kodlarını çalıştırmak için gerekli komutlar
```bash
python manage.py test
```
### Projenin frontend tarafının ayaklandırılması
```bash
npm install && npm start
```
### Cors hatasının alınmaması için gerekli django kütüphanesinin yüklenmesi
```bash
python -m pip install django-cors-headers
```


