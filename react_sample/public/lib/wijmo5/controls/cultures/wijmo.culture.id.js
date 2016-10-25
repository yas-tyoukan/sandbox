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
* Wijmo culture file: id (Indonesian)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 0, symbol: 'Rp', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': '.',
                firstDay: 0,
                days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                daysAbbr: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
                months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
                am: ['AM', 'A'],
                pm: ['PM', 'P'],
                eras: ['M'],
                patterns: {
                    d: 'dd/MM/yyyy', D: 'dddd, dd MMMM yyyy',
                    f: 'dddd, dd MMMM yyyy HH.mm', F: 'dddd, dd MMMM yyyy HH.mm.ss',
                    t: 'HH.mm', T: 'HH.mm.ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd/MM/yyyy HH.mm', G: 'dd/MM/yyyy HH.mm.ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} item yang dipilih'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} item)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Menaik',
            descending: '\u2193 Menurun',
            apply: 'Terapkan',
            clear: 'Bersihkan',
            conditions: 'Filter berdasarkan Kondisi',
            values: 'Filter berdasarkan Nilai',
            // value filter
            search: 'Cari',
            selectAll: 'Pilih Semua',
            null: '(tidak ada)',
            // condition filter
            header: 'Tampilkan item dengan nilai',
            and: 'Dan',
            or: 'Atau',
            stringOperators: [
                { name: '(tidak ditetapkan)', op: null },
                { name: 'Sama dengan', op: 0 },
                { name: 'Tidak sama dengan', op: 1 },
                { name: 'Dimulai dengan', op: 6 },
                { name: 'Diakhiri dengan', op: 7 },
                { name: 'Berisi', op: 8 },
                { name: 'Tidak berisi', op: 9 }
            ],
            numberOperators: [
                { name: '(tidak ditetapkan)', op: null },
                { name: 'Sama dengan', op: 0 },
                { name: 'Tidak sama dengan', op: 1 },
                { name: 'Besar dari', op: 2 },
                { name: 'Besar dari atau sama dengan', op: 3 },
                { name: 'Kurang dari', op: 4 },
                { name: 'Kurang dari atau sama dengan', op: 5 }
            ],
            dateOperators: [
                { name: '(tidak ditetapkan)', op: null },
                { name: 'Sama dengan', op: 0 },
                { name: 'Sebelum', op: 4 },
                { name: 'Setelah', op: 3 }
            ],
            booleanOperators: [
                { name: '(tidak ditetapkan)', op: null },
                { name: 'Sama dengan', op: 0 },
                { name: 'Tidak sama dengan', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.id.js.map

