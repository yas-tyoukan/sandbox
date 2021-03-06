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
* Wijmo culture file: sr (Serbian)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 0, symbol: 'RSD', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': '.',
                firstDay: 1,
                days: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
                daysAbbr: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
                months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
                monthsAbbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
                am: ['pre podne', 'pre podne'],
                pm: ['po podne', 'po podne'],
                eras: ['n. e.'],
                patterns: {
                    d: 'd.M.yyyy.', D: 'dddd, dd. MMMM yyyy.',
                    f: 'dddd, dd. MMMM yyyy. HH.mm', F: 'dddd, dd. MMMM yyyy. HH.mm.ss',
                    t: 'HH.mm', T: 'HH.mm.ss',
                    m: 'd. MMMM', M: 'd. MMMM',
                    y: 'MMMM yyyy.', Y: 'MMMM yyyy.',
                    g: 'd.M.yyyy. HH.mm', G: 'd.M.yyyy. HH.mm.ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} stavki odabrano'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} stavke)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Rastuće',
            descending: '\u2193 Opadajuće',
            apply: 'Primeni',
            clear: 'Obriši',
            conditions: 'Filtriraj prema uslovu',
            values: 'Filtriraj prema vrednosti',
            // value filter
            search: 'Traži',
            selectAll: 'Izaberi sve',
            null: '(ništa)',
            // condition filter
            header: 'Prikaži stavke gde je vredbnost',
            and: 'I',
            or: 'Ili',
            stringOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 },
                { name: 'Počinje sa', op: 6 },
                { name: 'Završava sa', op: 7 },
                { name: 'Sadrži', op: 8 },
                { name: 'Ne sadrži', op: 9 }
            ],
            numberOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 },
                { name: 'Veće od', op: 2 },
                { name: 'Veće od ili jednako', op: 3 },
                { name: 'Manje od', op: 4 },
                { name: 'Manje od ili jednako', op: 5 }
            ],
            dateOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Pre', op: 4 },
                { name: 'Posle', op: 3 }
            ],
            booleanOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.sr.js.map

