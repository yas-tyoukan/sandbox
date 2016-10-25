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
 * Wijmo culture file: zh-TW (Chinese (Traditional, Taiwan))
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: 'NT$', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 0,
                days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                daysAbbr: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsAbbr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                am: ['上午', '上'],
                pm: ['下午', '下'],
                eras: ['西元'],
                patterns: {
                    d: 'yyyy/M/d', D: 'yyyy"年"M"月"d"日"',
                    f: 'yyyy"年"M"月"d"日" tt hh:mm', F: 'yyyy"年"M"月"d"日" tt hh:mm:ss',
                    t: 'tt hh:mm', T: 'tt hh:mm:ss',
                    m: 'M月d日', M: 'M月d日', 
                    y: 'yyyy"年"M"月"', Y: 'yyyy"年"M"月"', 
                    g: 'yyyy/M/d tt hh:mm', G: 'yyyy/M/d tt hh:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '選定{count:n0}個項目'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} 項目)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 遞增排序',
            descending: '\u2193 遞減排序',
            apply: '應用',
            clear: '清除',
            conditions: '依條件篩選',
            values: '依值篩選',

            // value filter
            search: '搜尋',
            selectAll: '選取全部',
            null: '(無)',

            // condition filter
            header: '顯示項目的值為',
            and: '與',
            or: '或',
            stringOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 },
                { name: '開頭為', op: 6 },
                { name: '結尾為', op: 7 },
                { name: '包含', op: 8 },
                { name: '不包含', op: 9 }
            ],
            numberOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 },
                { name: '大於', op: 2 },
                { name: '大於或等於', op: 3 },
                { name: '小於', op: 4 },
                { name: '小於或等於', op: 5 }
            ],
            dateOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '早於', op: 4 },
                { name: '晚於', op: 3 }
            ],
            booleanOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 }
            ]
        }
    };
};
