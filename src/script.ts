const operators: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('#operators > div');
const display: HTMLDivElement | null = document.querySelector('#current-operation');
const clear: HTMLDivElement | null = document.querySelector('#c');
const del: HTMLDivElement | null = document.querySelector('#del');
const equal: HTMLDivElement | null = document.querySelector('#equal');

let calc: string = '';
let result: string = '';

function fct(num: number): number {
    if (num === 0) {
        return 1;
    }
    return num * fct(num - 1);
}


let powerRegex: RegExp = /\^/g;
let factRegex: RegExp = /\d+!/g;
let sqrRegex1: RegExp = /(?<!\d+)√\d+/g;
let sqrRegex2: RegExp = /\d+√\d+/g;
let per1Regex: RegExp = /\d+%(?!\d+)/g;
let per2Regex: RegExp = /\d+%\d+/g;


if (operators && display) {

    operators.forEach((operator) => {

        operator.addEventListener('click', () => {

            if (operator.textContent?.match(/\d/) || operator.textContent?.match(/\W/) && operator.textContent !== '=') {
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
        if (display) {
            let eqPower = calc.match(powerRegex) ?? [];
            let eqPowerLen = eqPower.length;

            let eqFactorial = calc.match(factRegex) ?? [];
            let eqFactorialLen = eqFactorial.length;

            let eqSqr1 = calc.match(sqrRegex1) ?? [];
            let sqrLen1 = eqSqr1.length;

            let eqSqr2 = calc.match(sqrRegex2) ?? [];
            let sqrLen2 = eqSqr2.length;

            let eqPer1 = calc.match(per1Regex) ?? [];
            let perLen1 = eqPer1.length;

            let eqPer2 = calc.match(per2Regex) ?? [];
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
            catch {
                display.textContent = 'ERROR';
                display.style.color = '#f00';
            }
            calc = display.textContent ?? '';
        }
    });
}