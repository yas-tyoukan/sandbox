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
 * Wijmo culture file: ko (Korean)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 0, symbol: '₩', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '-',
                ':': ':',
                firstDay: 0,
                days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                daysAbbr: ['일', '월', '화', '수', '목', '금', '토'],
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthsAbbr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                am: ['오전', '오전'],
                pm: ['오후', '오후'],
                eras: ['서기'],
                patterns: {
                    d: 'yyyy-MM-dd', D: 'yyyy"년" M"월" d"일" dddd',
                    f: 'yyyy"년" M"월" d"일" dddd tt h:mm', F: 'yyyy"년" M"월" d"일" dddd tt h:mm:ss',
                    t: 'tt h:mm', T: 'tt h:mm:ss',
                    m: 'M월 d일', M: 'M월 d일', 
                    y: 'yyyy"년" M"월"', Y: 'yyyy"년" M"월"', 
                    g: 'yyyy-MM-dd tt h:mm', G: 'yyyy-MM-dd tt h:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} 항목 선택'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} 항목)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 상승',
            descending: '\u2193 하락',
            apply: '적용',
            clear: '지움',
            conditions: '조건에 따른 필터',
            values: '값에 따른 필터',

            // value filter
            search: '검색',
            selectAll: '모두 선택',
            null: '(없음)',

            // condition filter
            header: '항목 표시: 값이',
            and: '및',
            or: '또는',
            stringOperators: [
                { name: '(설정되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 },
                { name: '다음의 값으로 시작하는 경우', op: 6 },
                { name: '다음의 값으로 끝나는 경우', op: 7 },
                { name: '다음의 값을 포함하는 경우', op: 8 },
                { name: '다음의 값을 포함하지 않는 경우', op: 9 }
            ],
            numberOperators: [
                { name: '(설정되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 },
                { name: '다음의 값보다 큰 경우', op: 2 },
                { name: '다음의 값보다 크거나 같은 경우', op: 3 },
                { name: '다음의 값보다 작은 경우', op: 4 },
                { name: '다음의 값보다 작거나 같은 경우', op: 5 }
            ],
            dateOperators: [
                { name: '(설정되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음의 값보다 앞에 있는 경우', op: 4 },
                { name: '다음의 값보다 뒤에 있는 경우', op: 3 }
            ],
            booleanOperators: [
                { name: '(설정되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 }
            ]
        }
    };
};
