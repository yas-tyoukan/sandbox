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
* Wijmo culture file: cs (Czech)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 2, symbol: 'Kč', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
                daysAbbr: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
                months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
                monthsAbbr: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
                am: ['dop.', 'd'],
                pm: ['odp.', 'o'],
                eras: ['n. l.'],
                patterns: {
                    d: 'dd.MM.yyyy', D: 'dddd d. MMMM yyyy',
                    f: 'dddd d. MMMM yyyy H:mm', F: 'dddd d. MMMM yyyy H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'd. MMMM', M: 'd. MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd.MM.yyyy H:mm', G: 'dd.MM.yyyy H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} položek vybraného'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} položky)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Vzestupně',
            descending: '\u2193 Sestupně',
            apply: 'Použít',
            clear: 'Vymazat',
            conditions: 'Filtrovat podle podmínky',
            values: 'Filtrovat podle hodnoty',
            // value filter
            search: 'Hledat',
            selectAll: 'Vybrat vše',
            null: '(nic)',
            // condition filter
            header: 'Zobrazit položky s hodnotou',
            and: 'A',
            or: 'Nebo',
            stringOperators: [
                { name: '(nenastaveno)', op: null },
                { name: 'Rovná se', op: 0 },
                { name: 'Nerovná se', op: 1 },
                { name: 'Začíná na', op: 6 },
                { name: 'Končí na', op: 7 },
                { name: 'Obsahuje', op: 8 },
                { name: 'Neobsahuje', op: 9 }
            ],
            numberOperators: [
                { name: '(nenastaveno)', op: null },
                { name: 'Rovná se', op: 0 },
                { name: 'Nerovná se', op: 1 },
                { name: 'Je větší než', op: 2 },
                { name: 'Je větší než nebo se rovná', op: 3 },
                { name: 'Je menší než', op: 4 },
                { name: 'Je menší než nebo se rovná', op: 5 }
            ],
            dateOperators: [
                { name: '(nenastaveno)', op: null },
                { name: 'Rovná se', op: 0 },
                { name: 'Je před', op: 4 },
                { name: 'Je po', op: 3 }
            ],
            booleanOperators: [
                { name: '(nenastaveno)', op: null },
                { name: 'Rovná se', op: 0 },
                { name: 'Nerovná se', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.cs.js.map

