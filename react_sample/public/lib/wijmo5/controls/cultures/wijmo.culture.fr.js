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
* Wijmo culture file: fr (French)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                daysAbbr: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
                months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                monthsAbbr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['ap. J.-C.'],
                patterns: {
                    d: 'dd/MM/yyyy', D: 'dddd d MMMM yyyy',
                    f: 'dddd d MMMM yyyy HH:mm', F: 'dddd d MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd/MM/yyyy HH:mm', G: 'dd/MM/yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} articles sélectionnés'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} articles)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Ascendant',
            descending: '\u2193 Descendant',
            apply: 'Appliquer',
            clear: 'Effacer',
            conditions: 'Filtrer par condition',
            values: 'Filtrer par valeur',
            // value filter
            search: 'Rechercher',
            selectAll: 'Sélectionner tout',
            null: '(rien)',
            // condition filter
            header: 'Afficher les articles avec la valeur',
            and: 'Et',
            or: 'Ou',
            stringOperators: [
                { name: '(non défini)', op: null },
                { name: 'Est égal à', op: 0 },
                { name: 'N\'est pas égal à', op: 1 },
                { name: 'Commence par', op: 6 },
                { name: 'Se termine par', op: 7 },
                { name: 'Contient', op: 8 },
                { name: 'Ne contient pas', op: 9 }
            ],
            numberOperators: [
                { name: '(non défini)', op: null },
                { name: 'Est égal à', op: 0 },
                { name: 'N\'est pas égal à', op: 1 },
                { name: 'Est supérieur à', op: 2 },
                { name: 'Est supérieur ou égal à', op: 3 },
                { name: 'Est inférieur à', op: 4 },
                { name: 'Est inférieur ou égal à', op: 5 }
            ],
            dateOperators: [
                { name: '(non défini)', op: null },
                { name: 'Est égal à', op: 0 },
                { name: 'Est avant', op: 4 },
                { name: 'Est après', op: 3 }
            ],
            booleanOperators: [
                { name: '(non défini)', op: null },
                { name: 'Est égal à', op: 0 },
                { name: 'N\'est pas égal à', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.fr.js.map

