﻿/*
    *
    * Wijmo Library 5.20153.117
    * http://wijmo.c1.grapecity.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * 
    * http://wijmo.c1.grapecity.com/license/
    *
    */
/*
* Wijmo culture file: ru (Russian)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '₽', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                daysAbbr: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthsAbbr: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['н.э.'],
                patterns: {
                    d: 'dd.MM.yyyy', D: 'd MMMM yyyy "г."',
                    f: 'd MMMM yyyy "г." H:mm', F: 'd MMMM yyyy "г." H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd.MM.yyyy H:mm', G: 'dd.MM.yyyy H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} пунктов выбрано'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} наименований)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 По возрастанию',
            descending: '\u2193 По убыванию',
            apply: 'Применить',
            clear: 'Очистить',
            conditions: 'Фильтр по условию',
            values: 'Фильтр по значению',
            // value filter
            search: 'Поиск',
            selectAll: 'Выбрать все',
            null: '(ничего)',
            // condition filter
            header: 'Показать элементы, значение которых',
            and: 'И',
            or: 'Или',
            stringOperators: [
                { name: '(не задано)', op: null },
                { name: 'равно', op: 0 },
                { name: 'не равно', op: 1 },
                { name: 'начинается с', op: 6 },
                { name: 'заканчивается на', op: 7 },
                { name: 'содержит', op: 8 },
                { name: 'не содержит', op: 9 }
            ],
            numberOperators: [
                { name: '(не задано)', op: null },
                { name: 'равно', op: 0 },
                { name: 'не равно', op: 1 },
                { name: 'больше, чем', op: 2 },
                { name: 'больше или равно', op: 3 },
                { name: 'меньше, чем', op: 4 },
                { name: 'меньше или равно', op: 5 }
            ],
            dateOperators: [
                { name: '(не задано)', op: null },
                { name: 'равно', op: 0 },
                { name: 'до', op: 4 },
                { name: 'после', op: 3 }
            ],
            booleanOperators: [
                { name: '(не задано)', op: null },
                { name: 'равно', op: 0 },
                { name: 'не равно', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.ru.js.map

