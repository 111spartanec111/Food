'use strict';

/*     4.51  -------------   */

// const persone = {
//     name: 'Alex',
//     tel: '+124124'
// };

// console.log(JSON.stringify(persone));  Передача данных через формат json на сервер stringify

// console.log(JSON.parse(JSON.stringify(persone))); /* передача данных С сервера */



const persone = {
    name: 'Alex',
    tel: '+124124',
    parents: {
        mom: 'Olga',
        dad: 'Mike'
    }
};
const clone = JSON.parse(JSON.stringify(persone));  /* Создание глубокого Клона */
clone.parents.mom = 'Ann';
console.log(persone);
console.log(clone);




