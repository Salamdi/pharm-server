требования:
----------

Node.js >= 6.10.0

mongoDB >= 3.4.2

Перед использованием задать необходимые настройки в файле /config/db.js

использование:
-------------

npm install

npm start


добавление новых магазинов:
--------------------------

добавить json файл в директорию /app/parser/shops, перезапустить сервер или сделать POST запрос с названием магазина
объект должен соответствовать слудющему формату:
```
{
    "name": <название магазина>,
    "priceUrl": <ссылка на прайс в формате csv>,
    "columns": {
        "id": <заголовок столбца с ID>,
        "name": <заголовок столбца с названиями>,
        "price": <заголовок столбца с ценами>
    },
    "delimiter": <разделитель использованный в csv файле>
}
```


запросы на сервер:
-----------------

GET /:shopName/:productId — возвращает JSON-объект следующего формата:
```
{
    "id": <ID товара>,
    "name": <название товара>,
    "price": <цена товара>
}
```

POST /:shopName — запускает обновление (добавление) прайса данного магазина
