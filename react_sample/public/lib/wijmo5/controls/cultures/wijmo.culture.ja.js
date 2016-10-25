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
* Wijmo culture file: ja (Japanese)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 0, symbol: '¥', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 0,
                days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                daysAbbr: ['日', '月', '火', '水', '木', '金', '土'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                monthsAbbr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                am: ['午前', '午前'],
                pm: ['午後', '午後'],
                eras: [
                    { name: '平成', symbol: 'H', start: new Date(1989, 0, 8) },
                    { name: '昭和', symbol: 'S', start: new Date(1926, 11, 25) },
                    { name: '大正', symbol: 'T', start: new Date(1912, 6, 30) },
                    { name: '明治', symbol: 'M', start: new Date(1868, 8, 8) }
                ],
                patterns: {
                    d: 'yyyy/MM/dd', D: 'yyyy"年"M"月"d"日"',
                    f: 'yyyy"年"M"月"d"日" H:mm', F: 'yyyy"年"M"月"d"日" H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'M月d日', M: 'M月d日',
                    y: 'yyyy"年"M"月"', Y: 'yyyy"年"M"月"',
                    g: 'yyyy/MM/dd H:mm', G: 'yyyy/MM/dd H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                fiscalYearOffsets: [3, 0]
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} 個の項目を選択中'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} 項目)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 昇順',
            descending: '\u2193 降順',
            apply: '適用',
            clear: 'クリア',
            conditions: '条件フィルタ',
            values: '値フィルタ',
            // value filter
            search: '検索',
            selectAll: 'すべて選択',
            null: '(なし)',
            // condition filter
            header: '抽出条件の指定',
            and: 'AND',
            or: 'OR',
            stringOperators: [
                { name: '(設定しない)', op: null },
                { name: '指定の値に等しい', op: 0 },
                { name: '指定の値に等しくない', op: 1 },
                { name: '指定の値で始まる', op: 6 },
                { name: '指定の値で終わる', op: 7 },
                { name: '指定の値を含む', op: 8 },
                { name: '指定の値を含まない', op: 9 }
            ],
            numberOperators: [
                { name: '(設定しない)', op: null },
                { name: '指定の値に等しい', op: 0 },
                { name: '指定の値に等しくない', op: 1 },
                { name: '指定の値より大きい', op: 2 },
                { name: '指定の値以上', op: 3 },
                { name: '指定の値より小さい', op: 4 },
                { name: '指定の値以下', op: 5 }
            ],
            dateOperators: [
                { name: '(設定しない)', op: null },
                { name: '指定の値に等しい', op: 0 },
                { name: '指定の値より前', op: 4 },
                { name: '指定の値より後', op: 3 }
            ],
            booleanOperators: [
                { name: '(設定しない)', op: null },
                { name: '指定の値に等しい', op: 0 },
                { name: '指定の値に等しくない', op: 1 }
            ]
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.ja.js.map

