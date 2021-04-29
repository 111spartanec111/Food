function slider() {
    
/* СЛАЙДЕР ------------------------------------------------------- */

const slides = document.querySelectorAll('.offer__slide'),  /* Каждые слайды отдельно */
      slider = document.querySelector('.offer__slider'),    /* ГЛАВНАЯ оболочка блока слайдера     ! */
      prev = document.querySelector('.offer__slider-prev'),   /* стрелочки */
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),         /* Общее количество слайдов */
      current = document.querySelector('#current'),     /* текущий слайд */
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),  /* ДЛЯ Карусели */
      slidesField = document.querySelector('.offer__slider-inner'),   /* Сама карусель */
      width = window.getComputedStyle(slidesWrapper).width;  /* Получаем стили (ширину) у окошка через которое будем смотреть на слайдер */

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;  /* Если количество слайдов меньше нуля, то подставляем сначала 0 , а потом slides.length = общее количество слайдов */
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;   /* в других случаях просто длинну переменной slides (общее количество слайдов) */
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';   /* ширина всей карусели 100% * длинну всех слайдов */
slidesField.style.display = 'flex';
slidesField.style.transition = '0.7s all';

slidesWrapper.style.overflow = 'hidden';   /* Скрываем видимость вокруг обёртки  */

slides.forEach(slide => {
    slide.style.width = width;
});

/* Добавление Точек */
slider.style.position = 'relative';

const indicators = document.createElement('ol'),
      dots = [];             /* переменная Массив, что бы туду положить все точки ниже !  dots.push(dot);  */

indicators.classList.add('carousel-indicators');    /* в CSS прописан класс ! со стилями или можно добавить здесь через - Ниже!*/
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

slider.append(indicators);


/* создаём цикл , переменная итератор, будет заканчиваться когда меньше длинны slides,  i++ цикл увеличивается на 1 */
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');   /* создаём элемент */
    dot.setAttribute('data-slide-to', i + 1);   /* к каждой точке устанавливается дата атрибут и прибавляем нумерацию 1, 2, 3 */
    // dot.style.cssText = `
    //     box-sizing: content-box;
    //     flex: 0 1 auto;
    //     width: 30px;
    //     height: 6px;
    //     margin-right: 3px;
    //     margin-left: 3px;
    //     cursor: pointer;
    //     background-color: #fff;
    //     background-clip: padding-box;
    //     border-top: 10px solid transparent;
    //     border-bottom: 10px solid transparent;
    //     opacity: .5;
    //     transition: opacity .6s ease;
    // `;
    dot.classList.add('dot'); /* или то что свеху! */
    
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);  /* Вставляем внутрь indicator(ol) - 'li' */
    dots.push(dot);   /* в dots помещаем dot */
}


function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}


next.addEventListener('click', () => {
    /* у переменной width (стоковый тип данных добавляем унарный +), методом slice начинаем с 0 символа и отрезаем последние 2 символа */
    /* Метод slice() извлекает часть строки и возвращает новую строку без изменения оригинальной строки.
    (offset == +width.slice(0, width.length - 2) * (slides.length - 1))  */

    /* Меняем на регулярное выражение */
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {   /* Удаляем все НЕ числа через паттерн */
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;  /* трансформируем по оси Х влево на offset */
    
    if(slideIndex == slides.length) {              /* Если конец слайдера то  */
        slideIndex = 1;      /* перемещаемся в начало  */
    } else {
        slideIndex++;                 /* увеличиваем на единицу */
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');   /* Перебираем точки для выставления стилей */
    dots[slideIndex - 1].style.opacity = 1;  /* выбранной точке задаём стиль */
});

prev.addEventListener('click', () => {
    /* у переменной width (стоковый тип данных добавляем унарный +), методом slice начинаем с 0 символа и отрезаем последние 2 символа */
    if (offset == 0) {    /* Если первый слайд нажимаем на стрелку влево - то */ 
        offset = deleteNotDigits(width) * (slides.length - 1);  /* В переменную offset записывается последний слайд который вычисляется по этой формуле */
    } else {
        offset -= deleteNotDigits(width); /* отнимаем ширину слайда */
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;  /* трансформируем по оси Х влево на offset */

    if(slideIndex == 1) {       /* когда мы на первом слайде */
        slideIndex = slides.length;       /* перемещаемся на последнюю позицию слайдера */
    } else {
        slideIndex--;  /* уменьшаем на единицу */
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');  
    dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {    /* перебираем массив (в переменной!) Клики по точкам - перелистывание слайдера и меняется current(текущий слайд) */
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1); 

        slidesField.style.transform = `translateX(-${offset}px)`;


        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
});

      /* ОБЫЧНЫЙ СЛАЙДЕР (перменные те же!)  Убрать обёртку в вёрстке у слайдов */
// let sliderIndex = 1;   /* Нумерация слайдов */

// showSlides(sliderIndex);  /* Вызываем созданную функцию слайдера и помещаем внутрь начальное положение sliderIndex */


/* Сколько всего слайдов total */
// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;  /* Если количество слайдов меньше нуля, то подставляем сначала 0 , а потом slides.length = общее количество слайдов */
// } else {
//     total.textContent = slides.length;   /* в других случаях просто длинну переменной slides (общее количество слайдов) */
// }


// function showSlides(n) {
//     if (n > slides.length) {   /* Если n будет больше чем колличество слайдов, то перелистнётся на Первый слайд (вправо) !  */
//         sliderIndex = 1;       /* Первый слайд  */
//     }
//     if (n < 1) {      /* Если n слайд будет мень первой позиции(нумерации) то покажется последний слайд (при перелистывании влево) */
//         sliderIndex = slides.length;   /* slides.length считаем количество слайдов и присваиваем к slideIndex */
//     }
//     slides.forEach((item) => item.style.display = 'none');  /* Перебираем слайды и устанавливаем всем значения display none */
//      /* Устанавливаем видимый слайд. Значение -1 в программировании = 0 то есть первому элементу(слайду) */
//     slides[sliderIndex - 1].style.display = 'block'; /* Первому элементу ставим display block 
//      Из переменной let sliderIndex = 1 приходит единица от неё отнимаем единицу = 0 то есть в прграммировании это первый элемент*/

/* Или через классы*/
// slides.forEach((item) => item.classList.add('hide','fade'));
 // slides[sliderIndex - 1].classList.remove('hide');


 /* Показываем текущий слайд  current*/
//     if (slides.length < 10) {   /* Счётчик текущего слайда !!! */
//         current.textContent = `0${sliderIndex}`;  /* Если количество слайдов меньше нуля, то подставляем сначала 0 */
//     } else {
//         current.textContent = sliderIndex;   /* в других случаях просто длинну переменной slides (общее количество слайдов) */
//     }
// }

// function plusSlides (n) {
//     showSlides(sliderIndex += n);  /* Увеличиваем sliderIndex на "n" пришедшее из значения Стрелок prev next  */
// }

// prev.addEventListener('click', () => {   /* Предыдущий слайд стрелка влево */
//     plusSlides(-1);  /* Передаём в функцию plusSlides значение -1 */
// });

// next.addEventListener('click', () => {  /* Следующий слайд стрелка вправо */
//     plusSlides(1);  /* Передаём в функцию plusSlides значение +1 */
// });

/* Конец слайдера!  */
}

module.exports = slider;