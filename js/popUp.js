/* VARIABLES */

import {cardsContent, blackout, cardsUl} from "./variables.js";

let modalWindow = document.querySelector('.modal_window');

function closePopUp(event){
  let varForModalWindow = modalWindow.childNodes[0];
  if (event.target == modalWindow || (varForModalWindow && event.target == varForModalWindow.childNodes[1])){
    modalWindow.style.visibility = 'hidden';
    modalWindow.innerHTML = '';
    blackout.style.visibility = 'hidden';
    document.querySelector('body').classList.remove('stop-scroll');
  }
  else{
    return;
  }
}

function popUp(event){
    modalWindow.insertAdjacentHTML('afterbegin',
                `<div class="popUp">
                  <button class="arrow btn-close" id="btn-close">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
                      </svg>
                  </button>
                  <img class="popUp-img" src="" alt="">
                  <div class="popUp-text">
                      <h2 class="popUp-title title"></h2>
                      <p class="popUp-subtitle"></p>
                      <p class="popUp-info"></p>
                      <ul class="popUp-list">
                          <li class="popUp-list-item"><span class="popUp-list-item-bold">Age:</span><span class="popUp-list-item-regular"></span></li>
                          <li class="popUp-list-item"><span class="popUp-list-item-bold">Inoculations:</span><span class="popUp-list-item-regular"></span></li>
                          <li class="popUp-list-item"><span class="popUp-list-item-bold">Diseases:</span><span class="popUp-list-item-regular"></span></li>
                          <li class="popUp-list-item"><span class="popUp-list-item-bold">Parasites:</span> <span class="popUp-list-item-regular"></span></li>
                      </ul>
                  </div>
              </div>`);
    let currentIndex = event.currentTarget.getAttribute('data-index');

    modalWindow.childNodes[0].childNodes[3].setAttribute('src', `${cardsContent[currentIndex].img}`);
    document.querySelector('.popUp-title').innerText = cardsContent[currentIndex].name;
    document.querySelector('.popUp-subtitle').innerText = cardsContent[currentIndex].type + ' - ' + cardsContent[currentIndex].breed;
    document.querySelector('.popUp-info').innerText = cardsContent[currentIndex].description;
    let arrOflistItems = document.querySelectorAll('.popUp-list-item-regular');
    arrOflistItems[0].innerText = cardsContent[currentIndex].age;
    arrOflistItems[1].innerText = cardsContent[currentIndex].inoculations;
    arrOflistItems[2].innerText = cardsContent[currentIndex].diseases;
    arrOflistItems[3].innerText = cardsContent[currentIndex].parasites;
    modalWindow.style.visibility = 'visible';
    blackout.style.visibility = 'visible';
    document.querySelector('body').classList.add('stop-scroll');
    modalWindow.childNodes[0].childNodes[1].addEventListener('click', closePopUp);
  }


   modalWindow.addEventListener('click', closePopUp);




  export{popUp};