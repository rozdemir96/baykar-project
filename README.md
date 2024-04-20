
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

### Testlerin çalıştırılması
![image](https://github.com/rozdemir96/baykar-project/assets/92824318/5756364d-c9fa-4364-8a51-efd273dd0ede)

## Projenin frontend üzerinden çalıştırılması
### Login ekranı
![1](https://github.com/rozdemir96/baykar-project/assets/92824318/44a16c7a-ba55-4974-a9ab-46870a025423)

### Kayıt Olma Ekranı
![2](https://github.com/rozdemir96/baykar-project/assets/92824318/b86fee57-011f-4eb4-a7ac-1c896f8cf0d0)

### Kayıt olurken sistemde kayıtlı bir username ile kayıt yapıldığında hata atılması
![loginerr](https://github.com/rozdemir96/baykar-project/assets/92824318/42c02158-f7da-4ab3-b7e7-b75b35aec628)

### Login olduktan sonra kullanıcıları İha ekleme ve Listeme ekranı karşılar 
![iha-list-and-add](https://github.com/rozdemir96/baykar-project/assets/92824318/8bbe411b-db2f-45b3-a5d4-eda588dfb35f)

### İha ekleme ekranı
![iha-add](https://github.com/rozdemir96/baykar-project/assets/92824318/f1669221-a854-443e-a77a-303d4c0903af)

### İha kiralamak için kirala butonuna basılır ve açılan pencereden tarih seçimi yapılır.
![iha-kirala](https://github.com/rozdemir96/baykar-project/assets/92824318/f546f404-fa96-4f28-b289-79ec9b01f9f6)

### Bitiş tarihi başlangıç tarihinden küçük olduğunda kullanıcıya uyarı verilir.
![iha kiralama tarih kontrol](https://github.com/rozdemir96/baykar-project/assets/92824318/c8fa2fb8-6ace-4eb5-a696-9ece102a6bac)


### İha başarıyla kiralandığında kiralandı olarak ekranda bildirimi verilir ve kiralanma tarihlerini gösterir.
![kiralanmıs-iha](https://github.com/rozdemir96/baykar-project/assets/92824318/27135f21-84cc-447c-8870-43f09963aa19)

### Kategori ekleme, listeme, güncelleme ve silme ekranı
![category-list](https://github.com/rozdemir96/baykar-project/assets/92824318/adb910f7-08cb-4e90-b3ca-ffc17f428072)

![category-add](https://github.com/rozdemir96/baykar-project/assets/92824318/e64b36a5-1353-44ed-90a0-b6789d839671)


![category-list-after-added](https://github.com/rozdemir96/baykar-project/assets/92824318/3e805037-cea7-4023-9485-4f8f6130aeb1)
