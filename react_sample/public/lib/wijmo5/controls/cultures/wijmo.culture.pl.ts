/*
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
 * Wijmo culture file: pl (Polish)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: 'zł', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
                daysAbbr: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
                months: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
                monthsAbbr: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
                am: ['AM', 'A'],
                pm: ['PM', 'P'],
                eras: ['n.e.'],
                patterns: {
                    d: 'dd.MM.yyyy', D: 'dddd, d MMMM yyyy',
                    f: 'dddd, d MMMM yyyy HH:mm', F: 'dddd, d MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd MMMM', M: 'd MMMM', 
                    y: 'MMMM yyyy', Y: 'MMMM yyyy', 
                    g: 'dd.MM.yyyy HH:mm', G: 'dd.MM.yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} pozycji wybrano'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} elem.)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 Rosnąco',
            descending: '\u2193 Malejąco',
            apply: 'Zastosuj',
            clear: 'Wyczyść',
            conditions: 'Filtruj według warunku',
            values: 'Filtruj według wartości',

            // value filter
            search: 'Wyszukaj',
            selectAll: 'Zaznacz wszystko',
            null: '(nic)',

            // condition filter
            header: 'Pokaż elementy, których wartość',
            and: 'I',
            or: 'Lub',
            stringOperators: [
                { name: '(nie ustawiono)', op: null },
                { name: 'Równa się', op: 0 },
                { name: 'Nie równa się', op: 1 },
                { name: 'Zaczyna się od', op: 6 },
                { name: 'Kończy się na', op: 7 },
                { name: 'Zawiera', op: 8 },
                { name: 'Nie zawiera', op: 9 }
            ],
            numberOperators: [
                { name: '(nie ustawiono)', op: null },
                { name: 'Równa się', op: 0 },
                { name: 'Nie równa się', op: 1 },
                { name: 'Jest większa niż', op: 2 },
                { name: 'Jest większa niż lub równa', op: 3 },
                { name: 'Jest mniejsza niż', op: 4 },
                { name: 'Jest mniejsza niż lub równa', op: 5 }
            ],
            dateOperators: [
                { name: '(nie ustawiono)', op: null },
                { name: 'Równa się', op: 0 },
                { name: 'Jest przed', op: 4 },
                { name: 'Jest po', op: 3 }
            ],
            booleanOperators: [
                { name: '(nie ustawiono)', op: null },
                { name: 'Równa się', op: 0 },
                { name: 'Nie równa się', op: 1 }
            ]
        }
    };
};
