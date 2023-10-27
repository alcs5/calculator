"use strict";
const operators = document.querySelectorAll('#operators > div');
const display = document.querySelector('#current-operation');
const clear = document.querySelector('#c');
const del = document.querySelector('#del');
const equal = document.querySelector('#equal');
let calc = '';
let result = '';
function fct(num) {
    if (num === 0) {
        return 1;
    }
    return num * fct(num - 1);
}
let powerRegex = /\^/g;
let factRegex = /\d+!/g;
let sqrRegex1 = /(?<!\d+)√\d+/g;
let sqrRegex2 = /\d+√\d+/g;
let per1Regex = /\d+%(?!\d+)/g;
let per2Regex = /\d+%\d+/g;
if (operators && display) {
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            var _a, _b;
            if (((_a = operator.textContent) === null || _a === void 0 ? void 0 : _a.match(/\d/)) || ((_b = operator.textContent) === null || _b === void 0 ? void 0 : _b.match(/\W/)) && operator.textContent !== '=') {
                calc += operator.textContent;
                display.textContent = parseInt(calc) > 999999999999999 ? `${parseInt(calc).toExponential(9)}` : calc;
                result = calc;
                display.style.color = '#fff';
            }
        });
    });
}
if (clear) {
    clear.addEventListener('click', () => {
        if (display) {
            calc = '';
            display.textContent = calc;
        }
    });
}
if (del) {
    del.addEventListener('click', () => {
        if (display) {
            calc = calc.slice(0, -1);
            display.textContent = calc;
        }
    });
}
if (equal) {
    equal.addEventListener('click', () => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (display) {
            let eqPower = (_a = calc.match(powerRegex)) !== null && _a !== void 0 ? _a : [];
            let eqPowerLen = eqPower.length;
            let eqFactorial = (_b = calc.match(factRegex)) !== null && _b !== void 0 ? _b : [];
            let eqFactorialLen = eqFactorial.length;
            let eqSqr1 = (_c = calc.match(sqrRegex1)) !== null && _c !== void 0 ? _c : [];
            let sqrLen1 = eqSqr1.length;
            let eqSqr2 = (_d = calc.match(sqrRegex2)) !== null && _d !== void 0 ? _d : [];
            let sqrLen2 = eqSqr2.length;
            let eqPer1 = (_e = calc.match(per1Regex)) !== null && _e !== void 0 ? _e : [];
            let perLen1 = eqPer1.length;
            let eqPer2 = (_f = calc.match(per2Regex)) !== null && _f !== void 0 ? _f : [];
            let perLen2 = eqPer2.length;
            for (let i = 0; i < eqPowerLen; i++) {
                calc = calc.replace(eqPower[i], '**');
            }
            for (let i = 0; i < eqFactorialLen; i++) {
                calc = calc.replace(eqFactorial[i], `fct(${eqFactorial[i].split('!')[0]})`);
            }
            for (let i = 0; i < sqrLen1; i++) {
                calc = calc.replace(eqSqr1[i], `Math.sqrt(${eqSqr1[i].split('√')[1]})`);
            }
            for (let i = 0; i < sqrLen2; i++) {
                calc = calc.replace(eqSqr2[i], `${parseInt(eqSqr2[i].split('√')[0])} * ${Math.sqrt(parseInt(eqSqr2[i].split('√')[1]))}`);
            }
            for (let i = 0; i < perLen1; i++) {
                calc = calc.replace(eqPer1[i], `${parseInt(eqPer1[i].split('%')[0]) / 100}`);
            }
            for (let i = 0; i < perLen2; i++) {
                calc = calc.replace(eqPer2[i], `${parseInt(eqPer2[i].split('%')[0])} * ${parseInt(eqPer2[i].split('%')[1]) / 100}`);
            }
            result = calc;
            if (display.textContent === '') {
                return;
            }
            try {
                const res = eval(result);
                display.textContent = res === 0.1 + 0.2 ? 0.3 : res;
            }
            catch (_h) {
                display.textContent = 'ERROR';
                display.style.color = '#f00';
            }
            calc = (_g = display.textContent) !== null && _g !== void 0 ? _g : '';
        }
    });
}
//# sourceMappingURL=script.js.map