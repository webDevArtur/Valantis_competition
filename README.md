# Задание

Используя предоставленный апи я создал страницу, которая отображает список товаров.  
Для каждого товара отображается его id, название, цена и бренд.

## Ссылка на сайт

## Требования:
* выводится по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
* есть возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду
![image](https://github.com/webDevArtur/Valantis_competition/assets/141954990/0ec865e4-2b1e-444c-8a4a-3122404cc2ec)

![image](https://github.com/webDevArtur/Valantis_competition/assets/141954990/1af867a0-d685-40b6-9d13-bcfa34b78ba8)

Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.
Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

Задание можно выполнять на **React** или на **нативном JS**.  
Оцениваться будет правильность работы сайта и качество кода.  
**Внешний вид** сайта оставляем на Ваше усмотрение.

Пароль для доступа к апи: **Valantis**  
API доступно по адресу:  
* http://api.valantis.store:40000/
