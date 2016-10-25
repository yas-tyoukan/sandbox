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
 * Wijmo culture file: el (Greek)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
                daysAbbr: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
                months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
                monthsAbbr: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
                am: ['πμ', 'π'],
                pm: ['μμ', 'μ'],
                eras: ['μ.Χ.'],
                patterns: {
                    d: 'd/M/yyyy', D: 'dddd, d MMMM yyyy',
                    f: 'dddd, d MMMM yyyy h:mm tt', F: 'dddd, d MMMM yyyy h:mm:ss tt',
                    t: 'h:mm tt', T: 'h:mm:ss tt',
                    m: 'd MMMM', M: 'd MMMM', 
                    y: 'MMMM yyyy', Y: 'MMMM yyyy', 
                    g: 'd/M/yyyy h:mm tt', G: 'd/M/yyyy h:mm:ss tt',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} αντικείμενα που επιλέγονται'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} στοιχεία)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 Με αύξουσα σειρά',
            descending: '\u2193 Με φθίνουσα σειρά',
            apply: 'Εφαρμογή',
            clear: 'Εκκαθάριση',
            conditions: 'Φιλτράρισμα ανά κατάσταση',
            values: 'Φιλτράρισμα ανά τιμή',

            // value filter
            search: 'Αναζήτηση',
            selectAll: 'Επιλογή όλων',
            null: '(τίποτα)',

            // condition filter
            header: 'Εμφάνιση στοιχείων όπου η τιμή',
            and: 'Και',
            or: 'Ή',
            stringOperators: [
                { name: '(δεν έχει οριστεί)', op: null },
                { name: 'Ισούται με', op: 0 },
                { name: 'Δεν ισούται με', op: 1 },
                { name: 'Αρχίζει με', op: 6 },
                { name: 'Τελειώνει με', op: 7 },
                { name: 'Περιέχει', op: 8 },
                { name: 'Δεν περιέχει', op: 9 }
            ],
            numberOperators: [
                { name: '(δεν έχει οριστεί)', op: null },
                { name: 'Ισούται με', op: 0 },
                { name: 'Δεν ισούται με', op: 1 },
                { name: 'Είναι μεγαλύτερη από', op: 2 },
                { name: 'Είναι μεγαλύτερη από ή ίση με', op: 3 },
                { name: 'Είναι μικρότερη από', op: 4 },
                { name: 'Είναι μικρότερη από ή ίση με', op: 5 }
            ],
            dateOperators: [
                { name: '(δεν έχει οριστεί)', op: null },
                { name: 'Ισούται με', op: 0 },
                { name: 'Είναι Πριν', op: 4 },
                { name: 'Είναι Μετά', op: 3 }
            ],
            booleanOperators: [
                { name: '(δεν έχει οριστεί)', op: null },
                { name: 'Ισούται με', op: 0 },
                { name: 'Δεν ισούται με', op: 1 }
            ]
        }
    };
};
