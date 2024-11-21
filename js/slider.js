/* VARIABLES */

import {cardsContent, blackout, cardsUl, arrowRight,
  arrowLeft, slider, 
  max_prev, max_next, prev, next, paginNumber, max_prev_path, max_next_path, prev_path, next_path
} from "./variables.js";

import {popUp } from "./popUp.js";

let arrOfLi = [];

let arrOfLiLong = [];

let numberOfPages;

let cardsPages = [];

let pageCounter = 1;

let previousIndexR = [];
let previousIndexL = [];



//переменная для того, чтобы опр на какой стр мы находимся
let locationUrl = window.location.href.split('').slice(-9, -5).join('');

/* EVENT LISTENERS */
document.addEventListener("DOMContentLoaded", initSlider);
window.addEventListener('resize', updateSlider);


function cardGeneration(){
  //геренируем карточки
  for(let i = 0; i < cardsContent.length; i++){
    let newItem = document.createElement('li');
    newItem.classList.add('our-friends__card');
    newItem.setAttribute('data-index', i);
    let cardLink = document.createElement('a');
    cardLink.classList.add('our-friends__card-link');
    newItem.appendChild(cardLink);
    let img = document.createElement('img');
    img.classList.add('card-img')
    img.src = cardsContent[i].img;
    img.alt = cardsContent[i].type;
    cardLink.appendChild(img);
    let cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = cardsContent[i].name;
    cardLink.appendChild(cardTitle);
    let cardButton = document.createElement('p');
    cardButton.classList.add('button');
    cardButton.classList.add('btn-border');
    cardButton.textContent = 'Learn more';
    cardLink.appendChild(cardButton);
    arrOfLi.push(newItem);
  }
}


function updateSlider(){
if(locationUrl == 'pets'){
paginNumber.innerHTML = 1;
pageCounter = 1;
arrOfLiLong = [];
if(window.innerWidth >=1280){
  numberOfPages = 6;
}
else if(window.innerWidth <1280 && window.innerWidth > 768){
    numberOfPages = 8;
}
else{
    numberOfPages = 16;
}
//генерируем массив карточек в соответствии с кол-вом стр
for(let i = 0; i < cardsPages.length; i++){
cardsPages[i].forEach((el)=>{
  arrOfLiLong.push(el);
})
}
cardsPages = [];
let numberOfElem = arrOfLiLong.length/numberOfPages;
for (let i = 0; i <Math.ceil(arrOfLiLong.length/numberOfElem); i++){
cardsPages[i] = arrOfLiLong.slice((i*numberOfElem), (i*numberOfElem) + numberOfElem);
}
cardsUl.innerHTML = '';
//выводим первую страницу
cardsPages[0].forEach((el)=>{
  cardsUl.appendChild(el);
  el.addEventListener('click', popUp);
});
next.classList.remove('arrow-not-active');
  max_next.classList.remove('arrow-not-active');
  next_path.classList.remove('arrow-not-active');
  max_next_path.classList.remove('arrow-not-active');
  next.removeAttribute('disabled');
  max_next.removeAttribute('disabled');
  prev.classList.add('arrow-not-active');
    max_prev.classList.add('arrow-not-active');
    prev_path.classList.add('arrow-not-active');
    max_prev_path.classList.add('arrow-not-active');
    prev.setAttribute('disabled', true);
    max_prev.setAttribute('disabled', true);
}}







function initSlider(){
  cardsPages = []
  numberOfPages = 0;
//если на pets
  if(locationUrl == 'pets'){
    next.addEventListener('click', nextPage);
    prev.addEventListener('click', prevPage);
    max_next.addEventListener('click', maxNextPage);
    max_prev.addEventListener('click', maxPrevPage);
    for(let number = 0; number< 6; number++){
      arrOfLi = [];
      cardGeneration();
      shuffleArray(arrOfLi);   
      cardsPages.push(arrOfLi)
      }
    updateSlider();
  }

//если стр index, генерируем массив карточек
  else{
    arrowRight.addEventListener('click', goRight)
    arrowLeft.addEventListener('click', goLeft)
    cardGeneration();
    shuffleArray(arrOfLi);
    let randomIndex;
  do{
    randomIndex = Math.floor(Math.random()*8);
  }
  while(arrOfLi[arrOfLi.length-1] == arrOfLi[randomIndex] || 
        arrOfLi[arrOfLi.length-2] == arrOfLi[randomIndex] ||
        arrOfLi[arrOfLi.length-3] == arrOfLi[randomIndex]
  );

  let randomElement = arrOfLi[randomIndex].cloneNode(true);
  arrOfLi.push(randomElement);

  arrOfLi.forEach((el)=>{
    cardsUl.appendChild(el);
    el.addEventListener('click', popUp);
  });
  }
}



function shuffleArray(array) {
  //берем элементы с конца (не сначала, чтобы не трогать уже перемешанные)
  for (let i = array.length - 1; i > 0; i--) {
    //генерируем рандомный номер индекса
    const j = Math.floor(Math.random() * (i + 1));
    //делаем деструктурирующее присваивание
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let countR = 0;
let countL = 0;


function goRight(){
  countL = 0;
  cardsUl.style.transform = "translateX(-100%)";
  cardsUl.style.transition = "transform 750ms";
  /*if(countR == 1){
    
    arrOfLi = arrOfLi.slice(3,6);
    let arrOfLiIndex = [];
    for(let el of arrOfLi){
      let ind = el.getAttribute('data-index');
      arrOfLiIndex.push(ind)
    }
    
    do{
      console.log(previousIndexR[3].getAttribute('data-index'))
      console.log(previousIndexR[4].getAttribute('data-index'))
      console.log(previousIndexR[5].getAttribute('data-index'))
      cardsUl.innerHTML = '';
      initSlider();
    }
    while(arrOfLi.includes(previousIndexR[3].getAttribute('data-index')) ||
          arrOfLi.includes(previousIndexR[4].getAttribute('data-index')) ||
          arrOfLi.includes(previousIndexR[5].getAttribute('data-index'))
    )
    countR++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
   // console.log(previousIndexR[3].getAttribute('data-index'), previousIndexR[4].getAttribute('data-index'), previousIndexR[5].getAttribute('data-index'))
//console.log(arrOfLi[0].getAttribute('data-index'), arrOfLi[1].getAttribute('data-index'), arrOfLi[2].getAttribute('data-index'))
    return;
  }*/

  if(previousIndexL.length != 0){
    let timer = setTimeout(function(){
      previousIndexR = [];
    for(let el of arrOfLi){
      previousIndexR.push(el);
    }
    cardsUl.innerHTML = '';
    previousIndexL.forEach((el)=>{
      cardsUl.appendChild(el);
    });
    previousIndexL = [];
    countR++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
    }, 750)
    
    
  }
  else{
    let timer = setTimeout(function(){
      previousIndexR = [];
    for(let el of arrOfLi){
      previousIndexR.push(el);
    }
    cardsUl.innerHTML ='';
    if(window.innerWidth >1279){
      for(let i = 0; i<3; i++){
        let element;
        element = arrOfLi.shift();
        arrOfLi.push(element);
      }
    }
    else if(window.innerWidth >=768){
      for(let i = 0; i<2; i++){
        let element;
        element = arrOfLi.shift();
        arrOfLi.push(element);
      }
    }
    else if(window.innerWidth <767){
      for(let i = 0; i<1; i++){
        let element;
        element = arrOfLi.shift();
        arrOfLi.push(element);
      }
    }
    
    arrOfLi.forEach((el)=>{
      cardsUl.appendChild(el);
    });
    countR++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
    }, 750)
  }

  




  
  /*
    if(previousIndexL.length != 0){
      previousIndexR = [];
      previousIndexR = document.querySelectorAll('.our-friends__card');
      cardsUl.innerHTML ='';
      previousIndexL.forEach((el)=>{
        cardsUl.appendChild(el);
      })
      previousIndexL = [];
    }
    else{
    previousIndexR = [];
    previousIndexR = document.querySelectorAll('.our-friends__card');
    cardsUl.innerHTML ='';
    initSlider();
    }
      */
    
  

  

  
}


function goLeft(){
  console.log(countL)
  countR = 0;
  cardsUl.style.transform = "translateX(+100%)";
  cardsUl.style.transition = "transform 750ms";
  
  
  /*if(countL == 1){
   
    cardsUl.innerHTML = '';
    do{
      initSlider();
    }
    while(previousIndexL[3] == arrOfLi[3] ||
          previousIndexL[4] == arrOfLi[4] ||
          previousIndexL[5] == arrOfLi[5]
    )
    countL++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
    return;
  }*/

  

  if(previousIndexR.length != 0){
    let timer = setTimeout(function(){
      previousIndexL = [];
    for(let el of arrOfLi){
      previousIndexL.push(el);
    }
    cardsUl.innerHTML = '';
    previousIndexR.forEach((el)=>{
      cardsUl.appendChild(el);
    });
    previousIndexR = [];
    countL++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
    }, 750)
  }
  else{
    let timer = setTimeout(function(){
      previousIndexL = [];
    for(let el of arrOfLi){
      previousIndexL.push(el);
    }
    if(window.innerWidth>1279){
      for(let i = 0; i<3; i++){
        let element;
        element = arrOfLi.pop();
        arrOfLi.unshift(element);
      }
    }
    else if(window.innerWidth>=768){
      for(let i = 0; i<2; i++){
        let element;
        element = arrOfLi.pop();
        arrOfLi.unshift(element);
      }
    }
    else{
      for(let i = 0; i<1; i++){
        let element;
        element = arrOfLi.pop();
        arrOfLi.unshift(element);
      }
    }
    
    cardsUl.innerHTML ='';
    arrOfLi.forEach((el)=>{
      cardsUl.appendChild(el);
    });
    countL++;
    cardsUl.style.transition = "none";
    cardsUl.style.transform = "translateX(0px)";
    }, 750)
    
  }



  /*
  if(previousIndexR.length != 0){
    previousIndexL = [];
    previousIndexL = document.querySelectorAll('.our-friends__card');
    cardsUl.innerHTML ='';
    previousIndexR.forEach((el)=>{
      cardsUl.appendChild(el);
    })
    previousIndexR = [];
  }
  else{
  previousIndexL = [];
  previousIndexL = document.querySelectorAll('.our-friends__card');
  cardsUl.innerHTML ='';
  initSlider();
  }



  */
  
}


















//функции слайдера для страницы PETS

function nextPage(){
  cardsUl.style.transform = "translateX(-100%)";
  cardsUl.style.transition = "transform 750ms";
  let timer;
  pageCounter++;
  if(pageCounter == numberOfPages){
    timer = setTimeout(function(){
      cardsUl.innerHTML = '';
      cardsPages[pageCounter-1].forEach((el)=>{
      cardsUl.appendChild(el);
      el.addEventListener('click', popUp);
    });
    cardsUl.style.transform = "translateX(0px)";
    cardsUl.style.transition = "none";
    },650);
    paginNumber.innerHTML = pageCounter;
    next.classList.add('arrow-not-active');
    max_next.classList.add('arrow-not-active');
    next_path.classList.add('arrow-not-active');
    max_next_path.classList.add('arrow-not-active');
    next.setAttribute('disabled', true);
    max_next.setAttribute('disabled', true);
  }
  else if(pageCounter <numberOfPages){
    timer = setTimeout(function(){
      cardsUl.innerHTML = '';
      cardsPages[pageCounter-1].forEach((el)=>{
      cardsUl.appendChild(el);
      el.addEventListener('click', popUp);
    });
    cardsUl.style.transform = "translateX(0px)";
    cardsUl.style.transition = "none";
    },650) 
    paginNumber.innerHTML = pageCounter;
  }
    prev.classList.remove('arrow-not-active');
    max_prev.classList.remove('arrow-not-active');
    prev_path.classList.remove('arrow-not-active');
    max_prev_path.classList.remove('arrow-not-active');
    prev.removeAttribute('disabled');
    max_prev.removeAttribute('disabled');
}







function prevPage(){
  cardsUl.style.transform = "translateX(+100%)";
  cardsUl.style.transition = "transform 750ms";
  let timer;
    if(pageCounter >1){
      pageCounter--;
      timer = setTimeout(function(){
        cardsUl.innerHTML = '';
        cardsPages[pageCounter-1].forEach((el)=>{
          cardsUl.appendChild(el);
          el.addEventListener('click', popUp);
        });
        cardsUl.style.transform = "translateX(0px)";
        cardsUl.style.transition = "none";
      },750);
      paginNumber.innerHTML = pageCounter;
    }
    if(pageCounter == 1){
      timer = setTimeout(function(){
        cardsPages[pageCounter-1].forEach((el)=>{
          cardsUl.appendChild(el);
          el.addEventListener('click', popUp);
        });
        cardsUl.style.transform = "translateX(0px)";
        cardsUl.style.transition = "none";
      },750);
      paginNumber.innerHTML = 1;
      prev.classList.add('arrow-not-active');
      max_prev.classList.add('arrow-not-active');
      prev_path.classList.add('arrow-not-active');
      max_prev_path.classList.add('arrow-not-active');
      prev.setAttribute('disabled', true);
      max_prev.setAttribute('disabled', true);
    } 
    next.classList.remove('arrow-not-active');
    max_next.classList.remove('arrow-not-active');
    next_path.classList.remove('arrow-not-active');
    max_next_path.classList.remove('arrow-not-active');
    next.removeAttribute('disabled');
    max_next.removeAttribute('disabled');
}





function maxNextPage(){
  paginNumber.innerHTML = numberOfPages;
  pageCounter = numberOfPages;
  cardsUl.innerHTML = '';
    cardsPages[numberOfPages-1].forEach((el)=>{
    cardsUl.appendChild(el);
    el.addEventListener('click', popUp);
  });

  next.classList.add('arrow-not-active');
  max_next.classList.add('arrow-not-active');
  next_path.classList.add('arrow-not-active');
  max_next_path.classList.add('arrow-not-active');
  next.setAttribute('disabled', true);
  max_next.setAttribute('disabled', true);
  prev.classList.remove('arrow-not-active');
    max_prev.classList.remove('arrow-not-active');
    prev_path.classList.remove('arrow-not-active');
    max_prev_path.classList.remove('arrow-not-active');
    prev.removeAttribute('disabled');
    max_prev.removeAttribute('disabled');
}

function maxPrevPage(){
  paginNumber.innerHTML = 1;
  pageCounter = 1;
  cardsUl.innerHTML = '';
    cardsPages[0].forEach((el)=>{
    cardsUl.appendChild(el);
    el.addEventListener('click', popUp);
  });
  next.classList.remove('arrow-not-active');
  max_next.classList.remove('arrow-not-active');
  next_path.classList.remove('arrow-not-active');
  max_next_path.classList.remove('arrow-not-active');
  next.removeAttribute('disabled');
  max_next.removeAttribute('disabled');
  prev.classList.add('arrow-not-active');
    max_prev.classList.add('arrow-not-active');
    prev_path.classList.add('arrow-not-active');
    max_prev_path.classList.add('arrow-not-active');
    prev.setAttribute('disabled', true);
    max_prev.setAttribute('disabled', true);
}















export{shuffleArray};









