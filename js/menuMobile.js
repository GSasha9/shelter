//console.log("Страница main: \n 1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14 \n 2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14 \n 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14 \n 4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6 \n 5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6 \n 6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6 \n 7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20 \n 8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n 9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n"+
//"Открытие меню при клике на иконку бургер-меню на текущем этапе не проверяется \n 10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8 \n 100/100 баллов");

/* VARIABLES */

import {burgerMenuIcon, menu__list, blackout} from "./variables.js";

let arrOfLinks = document.querySelectorAll('.menu__list-item');

/* EVENT LISTENERS */
burgerMenuIcon.addEventListener('click', openMobileMenu);
window.addEventListener('resize', closeMobileMenu);
window.addEventListener('scroll', closeMobileMenu);
blackout.addEventListener('click', closeMobileMenu);

[...arrOfLinks].forEach((el)=>{
    el.addEventListener('click', closeMobileMenu);
})


function openMobileMenu(){
    //проверяем, нет ли элемента с классом opened
    //если есть - удаляем класс (закрываем)
    if(menu__list.classList.contains('menu__list-mobile-opened')){
        closeMobileMenu();
    }
    else{
        //если нет - приваиваем класс, соответсвующий моб-му меню и открываем
        menu__list.classList.add('menu__list-mobile-opened');
        burgerMenuIcon.classList.add('menu__mobile-burger-rotated');
        document.querySelector('.blackout').style.visibility = 'visible';
        document.querySelector('body').classList.add('stop-scroll');
    }
    
}

function closeMobileMenu(){
    if(document.querySelector('.popUp')){
        return;
    }
        menu__list.classList.remove('menu__list-mobile-opened');
        burgerMenuIcon.classList.remove('menu__mobile-burger-rotated');
            document.querySelector('.blackout').style.visibility = 'hidden';
            document.querySelector('body').classList.remove('stop-scroll');
        return;
}



