const log = function(a, b, ...rest) {   /* rest оператор ...rest     Через рест оператор формируется массив */
    console.log(a, b , rest);
}

log('basic', 'rest', 'operator', 'usage');

function calcOrDouble(number, basis) {
    basis = basis || 2;  /* Если basis не был передан при вызове функции, то undefined = false ьудет 2 по умолчанию! */
    console.log(number * basis);
}
calcOrDouble(3);



function calcOrDouble(number, basis = 2) {   /* Или по умолчанию задаём 2  (стандарт ES6) */
    console.log(number * basis);
}
calcOrDouble(3);


