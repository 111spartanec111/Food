
/* Для запуска Сервера json сипользовать команду ->  npx json-server db.json */
/* Для запуска сборщика Webpack команда  npx webpack */

/* Каждый модуль оборачиваем в функцию , а после его записать как модуль пример:

function calc() {
    "Скрипт с калькулятором"
}

module.exports = calc;

в итоговом файле задать переменные которые будут ссылаться на модули и в конце вызвать эти функции. */


window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          cards = require('./modules/cards'),
          calc = require('./modules/calc'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider');

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();

});  /* Конец -------------------- */

