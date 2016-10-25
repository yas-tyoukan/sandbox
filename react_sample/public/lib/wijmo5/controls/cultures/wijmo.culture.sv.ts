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
 * Wijmo culture file: sv (Swedish)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 2, symbol: 'kr', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '-',
                ':': ':',
                firstDay: 1,
                days: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
                daysAbbr: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'],
                months: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
                monthsAbbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['A.D.'],
                patterns: {
                    d: 'yyyy-MM-dd', D: '"den "d MMMM yyyy',
                    f: '"den "d MMMM yyyy HH:mm', F: '"den "d MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: '"den "d MMMM', M: '"den "d MMMM', 
                    y: 'MMMM yyyy', Y: 'MMMM yyyy', 
                    g: 'yyyy-MM-dd HH:mm', G: 'yyyy-MM-dd HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} objekt utvalda'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} objekt)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 Stigande',
            descending: '\u2193 Fallande',
            apply: 'Använd',
            clear: 'Rensa',
            conditions: 'Filtrera efter villkor',
            values: 'Filtrera efter värde',

            // value filter
            search: 'Sök',
            selectAll: 'Välj alla',
            null: '(inget)',

            // condition filter
            header: 'Visa artiklar där värdet',
            and: 'Och',
            or: 'Eller',
            stringOperators: [
                { name: '(ej angett)', op: null },
                { name: 'Är lika med', op: 0 },
                { name: 'Inte är lika med', op: 1 },
                { name: 'Börjar med', op: 6 },
                { name: 'Slutar med', op: 7 },
                { name: 'Innehåller', op: 8 },
                { name: 'Inte innehåller', op: 9 }
            ],
            numberOperators: [
                { name: '(ej angett)', op: null },
                { name: 'Är lika med', op: 0 },
                { name: 'Inte är lika med', op: 1 },
                { name: 'Är större än', op: 2 },
                { name: 'Är större än eller lika med', op: 3 },
                { name: 'Är mindre än', op: 4 },
                { name: 'Är mindre än eller lika med', op: 5 }
            ],
            dateOperators: [
                { name: '(ej angett)', op: null },
                { name: 'Är lika med', op: 0 },
                { name: 'Är innan', op: 4 },
                { name: 'Är efter', op: 3 }
            ],
            booleanOperators: [
                { name: '(ej angett)', op: null },
                { name: 'Är lika med', op: 0 },
                { name: 'Inte är lika med', op: 1 }
            ]
        }
    };
};
