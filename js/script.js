
/* Для запуска Сервера json сипользовать команду ->  npx json-server db.json */
/* Для запуска сборщика Webpack команда  npx webpack */

/* Каждый модуль оборачиваем в функцию , а после его записать как модуль пример:

function calc() {
    "Скрипт с калькулятором"
}

module.exports = calc;

в итоговом файле задать переменные которые будут ссылаться на модули и в конце вызвать эти функции. */

/* import ДО обработчика событий на window */
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    /* Модалка по времени ----------------------------------------------*/
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);   /* Таймаут для появления модалки через секунды после обновления страницы */


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');  /* обязательно соблюдать порядок аргументов */
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-05-11');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({    /* передаём аргументы в виде объекта, используя деструктуризацию-не важно в каком порядке записаны значения */
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});  /* Конец -------------------- */

