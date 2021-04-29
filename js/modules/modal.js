    /* Переносим открытие модалки в Функцию !!!  то что тпереь снизу  */
    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);

        modal.classList.add('show');   
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        if (modalTimerId) {   /* Если передан modalTimerId то срабатывает функция clearInterval */
            clearInterval(modalTimerId);  /* Если мы открыли модалку, то она не будет появляться modalTimerId прописанный ниже */
        }
        
    }
    function closeModal(modalSelector) {   /* Создаём функцию что бы код не использовать/не прописывать во всех закрытиях по многу раз */
        const modal = document.querySelector(modalSelector);

        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';  /* overflow пустой что бы скролл вернулся после закрытия модалки */
    }


function modal(triggerSelector, modalSelector, modalTimerId) {
    
/*    MODAL  ------------------------------------------------------------------------- */

/* В css создать классы hide-display=none  и класс show-display=block  */

const modalTrigger = document.querySelectorAll(triggerSelector),    /* задаём кнопки по дата атрибутам  ALL - псевдомассив */
      modal = document.querySelector(modalSelector);                 /* задаём модальное окно */
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



    modalTrigger.forEach(btn => {   /* Т.к. псевдомассив, его необходимо перебрать(forEach), что бы срабатывало на все кнопки с дата атрибутом */
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));  /* Добавляем функцию объявленную выше !!! */  
    });
    
/* Вызов модалки если querySelector !!! без All !!!  то есть по первой кнопки вверствке, для работы со всеми кнопками то что выше!!! , у .modal  в свойствах написано display = none */
    //   modalTrigger.addEventListener('click', () => {     /* При клике на кнопку добавляем класс show и убираем hide */
    //     modal.classList.add('show');   
    //     modal.classList.remove('hide');
    //     document.body.style.overflow = 'hidden';  /* К body добавляем стиль overflow=hidden Что бы не прокручивалась страница */
    //   });



    /* Крестик */
    // modalCloseBtn.addEventListener('click', closeModal);  /* (142 строка)  При клике на КРЕСТИК выполняется эта Функция прописанная ранее */

    /* Подложка */
    modal.addEventListener('click', (e) => {   /* При клике На подложку/фон закрываем модалку */
        if (e.target === modal || e.target.getAttribute('data-close') == '') {  /* Клик на подложку или КРЕСТИК то модалка закрывается */
            closeModal(modalSelector);  /* Вызываем функцию, что бы она работала После улсовия if */
        }
    });

      /* ESCAPE */
    document.addEventListener('keydown', (e) => {  /* keydown - по клику какой нибудь кнопки на клавиатуре!!! */
        if ( e.code === "Escape" && modal.classList.contains('show')) {   /* проверяем, если содержится класс show в modal то тогда Escape сработает */
            closeModal(modalSelector);
        }
    });




    /* По скролу вызываем модалку */
    function showModalByScroll() {  /* Создаём функцию , если видимое окно + высота прокрутки >= всей высоте документа, то вызывается функция openModal(); После выполения функции отменяем её в window.removeEventListener*/
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
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


}

export default modal;
export {closeModal};
export {openModal};