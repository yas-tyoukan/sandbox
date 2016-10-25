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
* Wijmo culture file: kk (Kazakh)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '₸', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'],
                daysAbbr: ['жек', 'дүй', 'сей', 'сәр', 'бей', 'жұма', 'сен'],
                months: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
                monthsAbbr: ['қаң.', 'ақп.', 'нау.', 'сәу.', 'мам.', 'мау.', 'шіл.', 'там.', 'қыр.', 'қаз.', 'қар.', 'желт.'],
                am: ['таңертеңгі', 'таңертеңгі'],
                pm: ['түстен кейінгі', 'түстен кейінгі'],
                eras: ['б.з.'],
                patterns: {
                    d: 'dd/MM/yyyy', D: 'dddd, d MMMM yyyy',
                    f: 'dddd, d MMMM yyyy HH:mm', F: 'dddd, d MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd/MM/yyyy HH:mm', G: 'dd/MM/yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} элементтер таңдалған'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} элемент)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Артуы бойынша',
            descending: '\u2193 Кемуі бойынша',
            apply: 'Қолдану',
            clear: 'Тазалау',
            conditions: 'Шарты бойынша сүзу',
            values: 'Мәні бойынша сүзу',
            // value filter
            search: 'Іздеу',
            selectAll: 'Бәрін бөлектеу',
            null: '(жоқ)',
            // condition filter
            header: 'Мәні мынадай элементтерді көрсету',
            and: 'Және',
            or: 'Немесе',
            stringOperators: [
                { name: '(орнатылмаған)', op: null },
                { name: 'Тең', op: 0 },
                { name: 'Тең емес', op: 1 },
                { name: 'Басталады', op: 6 },
                { name: 'Аяқталады', op: 7 },
                { name: 'Құрамында бар', op: 8 },
                { name: 'Құрамында жоқ', op: 9 }
            ],
            numberOperators: [
                { name: '(орнатылмаған)', op: null },
                { name: 'Тең', op: 0 },
                { name: 'Тең емес', op: 1 },
                { name: 'Үлкендеу', op: 2 },
                { name: 'Үлкендеу немесе тең', op: 3 },
                { name: 'Аздау', op: 4 },
                { name: 'Аздау немесе тең', op: 5 }
            ],
            dateOperators: [
                { name: '(орнатылмаған)', op: null },
                { name: 'Тең', op: 0 },
                { name: 'Бұрын', op: 4 },
                { name: 'Кейін', op: 3 }
            ],
            booleanOperators: [
                { name: '(орнатылмаған)', op: null },
                { name: 'Тең', op: 0 },
                { name: 'Тең емес', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.kk.js.map

