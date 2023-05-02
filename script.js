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

const animation_erro= document.querySelector('.animation_erro')

let marcQuestCorrect = [0,1]

let marcQuestErro1 = [1,0]
let marcQuestErro2 = [2,2]

let correct_symbol = document.querySelector('.correct_symbol_p')
let error_symbol = document.querySelector('.error_symbol_p')

import questions from "./questions.js"

let currentIndex = 0
let questionsCorrect = 0
let questionsError = 0

correct_symbol.innerText = questionsCorrect
error_symbol.innerText = questionsError


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
  
    //SE ACERTAR A QUESTÃO
    if(e.target.getAttribute("data-correct") === "true") {
      
      quetCorr[marcQuestCorrect[currentIndex]].classList.add('animation_correct')
  
      quetCorr[marcQuestCorrect[currentIndex]].style.backgroundColor="var(--color3)"
      
      questionsCorrect++
      correct_symbol.innerText = questionsCorrect
    }else{
      
      quetCorr[marcQuestErro1[currentIndex]].classList.add('animation_erro')
  
      quetCorr[marcQuestErro1[currentIndex]].style.backgroundColor="var(--color1)"
      
      quetCorr[marcQuestErro2[currentIndex]].classList.add('animation_erro')
  
      quetCorr[marcQuestErro2[currentIndex]].style.backgroundColor="var(--color1)"
      
      quetCorr[marcQuestCorrect[currentIndex]].classList.add('animation_erro')
  
      quetCorr[marcQuestCorrect[currentIndex]].style.backgroundColor="var(--color1)"
      
      questionsError++
      error_symbol.innerText = questionsError
    }
    
  setTimeout(function() {
    //CASO NÃO TENHA ACABADO AS QUESTÕES
    if(currentIndex < questions.length -1) {
      currentIndex++
      loadQuestion()
    }
    
    //SE JA ACABOU AS QUESTÕES ELE TERMINA LIBERANDO A OPÇÃO DE RECOMEÇAR
    else{
      finish()
    }
  }, 650); 
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

//ABA DO QRCODE E FUNCIONALIDADES DAS MESMAS
const div_qrCode = document.querySelector('.comp')
const aba_comp = document.querySelector('.compartilhar_site')
aba_comp.addEventListener('click',()=>{
  div_qrCode.style.left="0"
})
const btnFec = document.querySelector('.btn_fec')
btnFec.addEventListener('click',()=>{
  div_qrCode.style.left="-100vw"
})