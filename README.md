# api-test-node
api-test-node
end-points
/signup  - POST запрос для регистрации пользователя тип строка JSON("name": "sting" и "password": "string"). Выходные данные JSON.
/signin  - POST запрос для авторизации пользователя строка JSON("name": "sting" и "password": "string") формируется токен JWT и передаётся в куки.Выходные данные JSON.
/signout  - GET запрос на выход удаление токена из куки.Выходные данные JSON.
/users/me  - GET  авторизированный запрос для получения данных пользователя.Выходные данные JSON.
/post  -  PATCH авторизированный запрос изменения поста в базе данных JSON("text": "sting" и "image": "string-link").Выходные данные JSON.
/posts/:id  - GET  получение списка из 20 постов, id это  номер страницы (каждая страница содержит не более 20 записей).Выходные данные JSON.
/count - GET получение общего количества записей в БД. Выходные данные число. 
/post - POST авторизированный запрос создание новой записи.Выходные данные JSON.
/post/:id -  GET авторизированный запрос поиск записи для редактирования.Выходные данные JSON.
/post/:id -  DELETE авторизированный запрос удаление записи.Выходные данные JSON.
