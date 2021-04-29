import {getResource} from '../services/services';


function cards() {
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
    
    /* Отсюда вырезали getResource в сервисы */
    
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
}

export default cards;