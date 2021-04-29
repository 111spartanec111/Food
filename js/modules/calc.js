function calc() {

/*   КАЛЬКУЛЯТОР ------------------------------------ */

const result = document.querySelector('.calculating__result span');  /* Куда помещаем результат  */
let sex, height, weight, age, ratio;   

    if (localStorage.getItem('sex')) {     
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');  /* по дефолту выбрали женщину */
    }

    if (localStorage.getItem('ratio')) {     /* Если в localStorage есть значение ratio то присваиваием ratio это значение. */
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;   /* По дефолту Если нет, то присваиваем значение 1.375 и записываем его в localstorage */
        localStorage.setItem('ratio', 1.375);  
    }

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');   /* Проверка класса активности */
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '----';
        return;   /* Если что то НЕ ! введено, то return останавливает дальнейший код */
    }
    if (sex === 'female') {   /* если введена Формула для женщин */
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();


function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {    /* перебираем элементы что бы установить обработчик событий на каждый элемент, что ыб при клике на подложку не ломалось */
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
    
            calcTotal();
        });
    })
}

getStaticInformation('#gender div', 'calculating__choose-item_active');  /* Объявляем функцию и внееё передаюм 2 значения parentSelector, activeClass.  Выбор parentSelector по ID */
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');   /* Выбор parentSelector по классу (обязательно с точкой parentselector) */


function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {   /* Ссылаемся на id инпута */

        if (input.value.match(/\D/g)) {   /* Проверяем есть ли любой символ кроме цифры match(/\D/g) */
            input.style.border = '1px solid red';  /* тогда красим в красный */
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height': 
                  height = +input.value;
                  break;
            case 'weight':
                  weight = +input.value;
                  break;
            case 'age':
                  age = +input.value;
                  break;     
        }

        calcTotal();  /* Вызываем пересчёт каждый раз  */
    });
}

getDynamicInformation('#height');  /* Вызываем функцию и передаём в неё ID инпутов  */
getDynamicInformation('#weight');
getDynamicInformation('#age');



}

export default calc;