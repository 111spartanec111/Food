/* Для запуска Сервера json сипользовать команду ->  npx json-server db.json */


window.addEventListener('DOMContentLoaded', () => {


/*      TABS   --------------------------------------------------------------------------------- */
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');  /* точку перед классом не ставим, т.к. работаем с командой classList */
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /*      TIMER   --------------------------------------------------------------------------------- */

    const deadline = '2021-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),   /* Считаем сколько милисекунд в минуте, в часе, в дне */
              hours = Math.floor((t / (1000 * 60 * 60) %  24)),   /* общее кол часов */
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {    /* Добавление нуля перед цифрами до 10 */
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();  /* Запускаем функцию чтобы не мигал таймер */

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

setClock('.timer', deadline);


/*    MODAL  ------------------------------------------------------------------------- */

/* В css создать классы hide-display=none  и класс show-display=block  */

const modalTrigger = document.querySelectorAll('[data-modal]'),    /* задаём кнопки по дата атрибутам  ALL - псевдомассив */
      modal = document.querySelector('.modal');                 /* задаём модальное окно */
    //   modalCloseBtn = document.querySelector('[data-close]');    /* (142 строка) крестик в модальном окне */

      /* Клик для показа модалка по data-modal */
    // modalTrigger.forEach(btn => {   /* Т.к. псевдомассив, его необходимо перебрать(forEach), что бы срабатывало на все кнопки с дата атрибутом */
    //     btn.addEventListener('click', () => {     /* При клике на кнопку добавляем класс show и убираем hide */
    //         // setTimeout(function() {   /* Внутрь setTimeout поместил действия, что бы была задержка (Можно удалить) */
    //             modal.classList.add('show');   
    //             modal.classList.remove('hide');
    //             document.body.style.overflow = 'hidden';  /* К body добавляем стиль overflow=hidden Что бы не прокручивалась страница */
    //         // }, 500);
    //     });   
    // });  


    /* Переносим открытие модалки в Функцию !!!  то что сверху */
    function openModal() {
        modal.classList.add('show');   
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);  /* Если мы открыли модалку, то она не будет появляться modalTimerId прописанный ниже */
    }
    modalTrigger.forEach(btn => {   /* Т.к. псевдомассив, его необходимо перебрать(forEach), что бы срабатывало на все кнопки с дата атрибутом */
        btn.addEventListener('click', openModal);  /* Добавляем функцию объявленную выше !!! */  
    });
    
/* Вызов модалки если querySelector !!! без All !!!  то есть по первой кнопки вверствке, для работы со всеми кнопками то что выше!!! , у .modal  в свойствах написано display = none */
    //   modalTrigger.addEventListener('click', () => {     /* При клике на кнопку добавляем класс show и убираем hide */
    //     modal.classList.add('show');   
    //     modal.classList.remove('hide');
    //     document.body.style.overflow = 'hidden';  /* К body добавляем стиль overflow=hidden Что бы не прокручивалась страница */
    //   });

    function closeModal() {   /* Создаём функцию что бы код не использовать/не прописывать во всех закрытиях по многу раз */
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';  /* overflow пустой что бы скролл вернулся после закрытия модалки */
    }

    /* Крестик */
    // modalCloseBtn.addEventListener('click', closeModal);  /* (142 строка)  При клике на КРЕСТИК выполняется эта Функция прописанная ранее */

    /* Подложка */
    modal.addEventListener('click', (e) => {   /* При клике На подложку/фон закрываем модалку */
        if (e.target === modal || e.target.getAttribute('data-close') == '') {  /* Клик на подложку или КРЕСТИК то модалка закрывается */
            closeModal();  /* Вызываем функцию, что бы она работала После улсовия if */
        }
    });

      /* ESCAPE */
    document.addEventListener('keydown', (e) => {  /* keydown - по клику какой нибудь кнопки на клавиатуре!!! */
        if ( e.code === "Escape" && modal.classList.contains('show')) {   /* проверяем, если содержится класс show в modal то тогда Escape сработает */
            closeModal();
        }
    });


    /* Модалка по времени ----------------------------------------------*/
    const modalTimerId = setTimeout(openModal, 50000);   /* Таймаут для появления модалки через секунды после обновления страницы */


    /* По скролу вызываем модалку */
    function showModalByScroll() {  /* Создаём функцию , если видимое окно + высота прокрутки >= всей высоте документа, то вызывается функция openModal(); После выполения функции отменяем её в window.removeEventListener*/
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);  /* Обработчик для вызова функции showModalByScroll по скролу !!! */


/* Через querySelector - ИЛИ  Можно через toggle - переключатель, В модалке обязательно display = none */
//   modalTrigger.addEventListener('click', () => {     
//     modal.classList.toggle('show');
//     document.body.style.overflow = 'hidden';  
//   });

/* Через querySelectorAll через Перебор forEach   Через Toggle , но подложку тогда надо дорабатывать */
    // modalTrigger.forEach(btn => { 
    // btn.addEventListener('click', () => {     
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden';  
    // });  
    // });
    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = '';  
    // });



    /*   Используем CLASS Карточки, шаблонизируем   ----------------------------------------------------------------------- */

class MenuCard {
    constructor(src, altimg, title, descr, price, parentSelector, ...classes) { /* rest оператор ...название */
        this.src = src;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.cena = price;  /* Можно своё название CENA но его использовать в шаблоне везде!!! */
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);   /* DOM элемент  */
        this.transfer = 27;      /* курс валюты */
        this.changeToUAH();     /* вызываем метод для конвертации курса */
    }
    changeToUAH() {              /* создаём метод конвертации */
        this.cena = this.cena * this.transfer;
    }
    render() {      /* Создаём метод шаблон! */
        const element = document.createElement('div');
        /* Создаём условие if */
        if (this.classes.length === 0) {    /* Если не были переданные классы = 0, то element = menu__item и добавляем класс к элементу */
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {  /* если класс был введён в new MenuCard то идёт переборка массива через forEach что бы добавить классы */
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.altimg}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cena}</span> $/день</div>
            </div>
        `;
        this.parent.append(element);  /* append - вставляем элемент после parent */
    }
}


/* Отправка данных из db.json на сайт  GET */
const getResource = async (url) => {   /* async Внутри функции будет асинхронный код */
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);  /* Создаём ошибку вручную, если запрос не выполнился */
    }
    return await res.json();  /* await ждёт выполнения функции */
};

getResource('http://localhost:3000/menu')
.then(data => {                  /* из промисса выдаётся массив из db.json */
    data.forEach(({img, altimg, title, descr, price}) => {          /* перебираем массив */
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();   /* Вызываем класс MenuCard созданный выше */    
    });
});


/*   Библиотека AXIOS с помощью неё конвертация из json в js Тогда не нужно создавать функцию getResource что выше !!! */
// axios.get('http://localhost:3000/menu')  
//     .then(data =>  {
//         data.data.forEach(({img, altimg, title, descr, price}) => {      
//             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();     
//         });
//     });


/* Можно создать карточки без Шаблона MenuCard !!!   Если нужно создать что то один раз (или не часто повторяющееся)*/

// getResource('http://localhost:3000/menu')
//         .then(data => createCard(data));
//     function createCard(data) {
//         data.forEach(({img, altimg, title, descr, price, transfer}) => {
//             transfer = 27;
//             const element = document.createElement('div');
//             element.classList.add("menu__item");
//             element.innerHTML = `
//                 <img src=${img} alt=${altimg}>
//                 <h3 class="menu__item-subtitle">${title}</h3>
//                 <div class="menu__item-descr">${descr}</div>
//                 <div class="menu__item-divider"></div>
//                 <div class="menu__item-price">
//                     <div class="menu__item-cost">Цена:</div>
//                     <div class="menu__item-total"><span>${price * transfer}</span> грн/день</div>
//                 </div>
//             `;
//             document.querySelector(".menu .container").append(element);
//         });
// }



/*   FORMS -------------------------------------------------------------------------------- */


const forms = document.querySelectorAll('form'); /* Создаём переменную форм и прикрепляем её ко всем формам */

const message = {   /* переменная с сообщениями которые вставляем после нажатия на кнопку Отправить */
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Мы с вами свяжемся!',
    failure: 'Что то пошло не так...'
};


forms.forEach(item => {   /* Переборка массива т.к. querySelectorAll что бы выбрать все формы.  */
    bindPostData(item);    /* Подвязываем функцию postData к формам переменная - forms */
});

const postData = async (url, data) => {   /* async Внутри функции будет асинхронный код */
    const res = await fetch(url, {       /* await ждёт результата запроса того что ниже */
        method:"POST",       /* Если проммис попадает на ошибку которая связана с http протоколом, то он не будет ошибочным(reject). */
        headers: {            /* reject будет возникать только при отсутствии сети Offline */
            'Content-type': 'application/json' 
        },
        body: data
    });
    return await res.json();  /* await ждёт выполнения функции */
};

function bindPostData(form) {   /* Создаём функцию отправки формы, подвязываем её выше*/
    form.addEventListener('submit', (e) => {   /* по деволту в верстке у кнопок стоит submit */
        e.preventDefault();     /* отменяем дефолтное поведение*/

        const statusMessage = document.createElement('img');   /* НОВОЕ - Добавляем элемент img
        (Старое-после нажатия на кнопку button submit создаём элемент div 
        с классом status и берём текст из переменной message.loading) */
        statusMessage.src = message.loading;            /* в img добавляем атрибут src = message.loading */
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;    /* loading 'Загрузка'  добавляем стили что бы было по центу */
        form.insertAdjacentElement('afterend', statusMessage);  /* Добавляем img после формы */
        /* Или через добавление класса в css Spinner  position absolute,  а в форме position relative */
        // statusMessage.classList.add('spinner');
        // form.append(statusMessage);          /* добавляем наш img / div после формы */


        // const request = new XMLHttpRequest(); /* создаём переменную Request с запросом XMLHttpRequest */
        // request.open('POST', 'server.php');  /* Вызыаем метот open для настройки запроса */      
        // request.setRequestHeader('Content-type', 'application/json');  /* Настройка заголовков которые говорят, что приходит серверу. (Отправка не через json - 'multipart/form-data')*/
        
        const formData = new FormData(form);     /* ключ-значение из формы form, которая в postData(form). атрибут name обязательно должен быть у форм в вёрстке */

        // const object = {};
        // formData.forEach(function(value, key) {  /* Перебираем formData что бы перевести в json формат */
        //     object[key] = value;
        // });

        const json = JSON.stringify(Object.fromEntries(formData.entries())); /* formData - превращаем из объекта в массив массивов, потом с помощью Object.fromEntries превращаем в объект, а после превращаем в JSON */

        /* fetch для создания AJAX запросов в замен XMLHttpReques. Fetch API предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP */
        // fetch('server.php', {   /* Создаём запрос на сервер через fetch а не через XMLHttpRequest.   */
        //     method:"POST",       /* Если проммис попадает на ошибку которая связана с http протоколом, то он не будет ошибочным(reject). */
        //     headers: {            /* reject будет возникать только при отсутствии сети Offline */
        //         'Content-type': 'application/json' 
        //     },
        //     body: JSON.stringify(object)
        // })

        /* Постим данные с формы в фал db.json в requests */
        postData('http://localhost:3000/requests', json)   /* Рефакторинг того что сверху (вынесли в функцию postData) */

        .then(data => {             /* Возвращается промис */
            console.log(data);       /* То что вернул сервер */
            showThanksModal(message.success);    /* Добавляем функцию созданную ниже - Спасибо с вами свяжутся */
            statusMessage.remove();      /* Удаляем спинер */
        }).catch(() => {         /* Если что то  пошло не так */
            showThanksModal(message.failure);    /* Вызываем функцию с другим текстом - Что то пошло не так   */
        }).finally(() => {    /* finally метод который срабатывает всегда, не важно предыдущий промисс спешный или нет(catch) */
            form.reset();     /* Вызываем функцию сброса формы */
        });

        // request.addEventListener('load', () => {
        //     if (request.status === 200) {                    /*Проверяем что всё Ок! 200 - код состояния HTTP Google ! */
        //         console.log(request.response);
        //         showThanksModal(message.success);  /* Добавляем функцию созданную ниже Спасибо с вами свяжутся */
        //         form.reset();                               /* сбрасываем форму */
        //         statusMessage.remove();   /* Удаляем сообщение  */
        //     } else {   /* Если сервер "упал"  ТО  выполняется то что else ! */
        //         showThanksModal(message.failure);  /* Вызываем функцию с другим текстом - Что то пошло не так   */
        //     }
        // });
    });
}

/*  "Загрузка Модалки" -------------------------------- */

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');   /* Скрываем модалку modal__dialog по добавлению класса hide */
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');  /* Добавляем новый элемент DIV с классом  modal__dialog */
    thanksModal.innerHTML = `   
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;  /* Создаём шаблон новой модалки которую добавили выше с текстом благодарности */
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}
  
    fetch('http://localhost:3000/menu')  /* Обращаемся к базе данных взятой из npx json-server db.json*/
    .then(data => data.json()) /*  берём ответ от сервера и превращаем в js объект */
    .then(res => console.log(res));  /* Выводим массив с объектами в консоль */
    



/* СЛАЙДЕР ------------------------------------------------------- */

const slides = document.querySelectorAll('.offer__slide'),  /* Каждый слайд отдельно */
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
      dots = [];

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
    dot.setAttribute('data-slide-to', i + 1);   /*к каждой точке устанавливается дата атрибут и прибавляем 1 */
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

next.addEventListener('click', () => {
    /* у переменной width (стоковый тип данных добавляем унарный +), методом slice начинаем с 0 символа и отрезаем последние 2 символа */
    /* Метод slice() извлекает часть строки и возвращает новую строку без изменения оригинальной строки. */
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {   
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
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
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);  /* В переменную offset записывается последний слайд который вычисляется по этой формуле */
    } else {
        offset -= +width.slice(0, width.length - 2); /* отнимаем ширину слайда */
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
        offset = +width.slice(0, width.length - 2) * (slideTo - 1); 

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




});  /* Конец -------------------- */

