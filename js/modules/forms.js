function forms() {

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
    
}

module.exports = forms;