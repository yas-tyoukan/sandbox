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
* Wijmo culture file: es (Spanish)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                daysAbbr: ['do.', 'lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.'],
                months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthsAbbr: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['d. C.'],
                patterns: {
                    d: 'dd/MM/yyyy', D: 'dddd, d" de "MMMM" de "yyyy',
                    f: 'dddd, d" de "MMMM" de "yyyy H:mm', F: 'dddd, d" de "MMMM" de "yyyy H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'd "de" MMMM', M: 'd "de" MMMM',
                    y: 'MMMM" de "yyyy', Y: 'MMMM" de "yyyy',
                    g: 'dd/MM/yyyy H:mm', G: 'dd/MM/yyyy H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} ítems seleccionados'
        },
        FlexGrid: {
            groupHeaderFormat: '<b>{value} </b>({count:n0} ítems)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Ascendente',
            descending: '\u2193 Descendente',
            apply: 'Aplicar',
            clear: 'Borrar',
            conditions: 'Condiciones',
            values: 'Valores',
            // value filter
            search: 'Filtro',
            selectAll: 'Seleccionar todo',
            null: '(nulo)',
            // condition filter
            header: 'Mostrar ítems donde el valor',
            and: 'Y',
            or: 'O',
            stringOperators: [
                { name: '(ninguno)', op: null },
                { name: 'Es igual a', op: 0 },
                { name: 'No es igual a', op: 1 },
                { name: 'Comienza con', op: 6 },
                { name: 'Termina con', op: 7 },
                { name: 'Contiene', op: 8 },
                { name: 'No contiene', op: 9 }
            ],
            numberOperators: [
                { name: '(ninguno)', op: null },
                { name: 'Es igual a', op: 0 },
                { name: 'No es igual a', op: 1 },
                { name: 'Es mayor que', op: 2 },
                { name: 'Es mayor o igual a', op: 3 },
                { name: 'Es menor que', op: 4 },
                { name: 'Es menor o igual a', op: 5 }
            ],
            dateOperators: [
                { name: '(ninguno)', op: null },
                { name: 'Es igual a', op: 0 },
                { name: 'Es anterior a', op: 4 },
                { name: 'Es posterior a', op: 3 }
            ],
            booleanOperators: [
                { name: '(ninguno)', op: null },
                { name: 'Es igual a', op: 0 },
                { name: 'No es igual a', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.es.js.map

