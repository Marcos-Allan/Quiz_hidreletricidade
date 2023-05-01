const question= document.querySelector(".question")
const answers= document.querySelector(".answers")
const spnQtd= document.querySelector(".spnQtd")
const textFinish= document.querySelector(".finish span")
const content= document.querySelector(".content")
const contentFinish= document.querySelector(".finish")
const btnRestart= document.querySelector(".finish button")

const h2= document.querySelector('h2')
const main= document.querySelector('main')

const animation_entrada= document.querySelector('.animation_entrada')

const animation_correct= document.querySelector('.animation_correct')

let marcQuestCorrect = [0,1]

let correct_symbol = document.querySelector('.correct_symbol')
let error_symbol = document.querySelector('.error_symbol')

import questions from "./questions.js"

let currentIndex = 0
let questionsCorrect = 0
let questionsError = 0

btnRestart.onclick= () => {
  
  main.classList.add('animation_entrada')
  h2.classList.add('animation_entrada')
  
  content.style.display="flex"
  contentFinish.style.display="none"
  
  currentIndex=0
  questionsCorrect=0
  questionsError=0
  
  correct_symbol.innerText = questionsCorrect
  error_symbol.innerText = questionsError
  
  loadQuestion()
}

function nextQuestion(e) {
  
  let quetCorr=[...document.querySelectorAll('[data-correct]')]
  quetCorr.map((el)=>{
    el.removeEventListener("click",nextQuestion)
  })
  quetCorr[marcQuestCorrect[currentIndex]].classList.add('animation_correct')
  
  quetCorr[marcQuestCorrect[currentIndex]].style.backgroundColor="var(--color3)"
    
  setTimeout(function() {
    //SE ACERTAR A QUESTÃO
    if(e.target.getAttribute("data-correct") === "true") {
      questionsCorrect++
      correct_symbol.innerText = questionsCorrect
    }else{
      questionsError++
      error_symbol.innerText = questionsError
    }
    
    //CASO NÃO TENHA ACABADO AS QUESTÕES
    if(currentIndex < questions.length -1) {
      currentIndex++
      loadQuestion()
    }
    
    //SE JA ACABOU AS QUESTÕES ELE TERMINA LIBERANDO A OPÇÃO DE RECOMEÇAR
    else{
      finish()
    }
  }, 600); 
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`
  content.style.display="none"
  contentFinish.style.display="flex"
  
  main.classList.remove('animation_entrada')
  h2.classList.remove('animation_entrada')
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex +1}/${questions.length}`
  const item = questions[currentIndex]
  answers.innerHTML = ""
  question.innerHTML = item.question
  
  item.answers.forEach((answer) => {
    const div=document.createElement("div")
    
    div.innerHTML =`
    <button class="answer" data-correct="${answer.correct}">
    ${answer.option}
    </button>
    `;
    
    answers.appendChild(div)
  })
  
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion)
  })
}

loadQuestion()