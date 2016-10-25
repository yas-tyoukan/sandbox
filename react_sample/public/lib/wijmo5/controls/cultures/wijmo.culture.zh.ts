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
 * Wijmo culture file: zh (Chinese)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '¥', pattern: ['$-n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                daysAbbr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                am: ['上午', '上'],
                pm: ['下午', '下'],
                eras: ['公元'],
                patterns: {
                    d: 'yyyy/M/d', D: 'yyyy"年"M"月"d"日"',
                    f: 'yyyy"年"M"月"d"日" H:mm', F: 'yyyy"年"M"月"d"日" H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'M月d日', M: 'M月d日', 
                    y: 'yyyy"年"M"月"', Y: 'yyyy"年"M"月"', 
                    g: 'yyyy/M/d H:mm', G: 'yyyy/M/d H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '选定{count:n0}个项目'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} 项目)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 升序',
            descending: '\u2193 降序',
            apply: '应用',
            clear: '清除',
            conditions: '按条件过滤',
            values: '按值过滤',

            // value filter
            search: '搜索',
            selectAll: '选择全部',
            null: '（无）',

            // condition filter
            header: '显示下列值的项目',
            and: '和',
            or: '或',
            stringOperators: [
                { name: '（非预设）', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 },
                { name: '开头为', op: 6 },
                { name: '结尾为', op: 7 },
                { name: '包含', op: 8 },
                { name: '不包含', op: 9 }
            ],
            numberOperators: [
                { name: '（非预设）', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 },
                { name: '大于', op: 2 },
                { name: '大于等于', op: 3 },
                { name: '小于', op: 4 },
                { name: '小于等于', op: 5 }
            ],
            dateOperators: [
                { name: '（非预设）', op: null },
                { name: '等于', op: 0 },
                { name: '之后为', op: 4 },
                { name: '之前为', op: 3 }
            ],
            booleanOperators: [
                { name: '（非预设）', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 }
            ]
        }
    };
};
