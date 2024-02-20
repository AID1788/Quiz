let container_main = document.querySelector('.main')
let container_start = document.querySelector('.start')
let container_start_h3 = container_start.querySelector('h3')
let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let start_button = document.querySelector('.start-btn')
let start_button_quote = document.querySelector('.start-btn_quote')


function randint(min, max) {
    return Math.trunc(Math.random() * (max - min) + min)
}

// варианты знаков
let signs = ['+', '-', '*', '/']
function getRandomSign() {
    return signs[randint(0, 3)]
}

// перемешка
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// вывод рандомизированных вопросов
class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {this.correct = a + b}
        else if (sign == '-') {this.correct = a - b}
        else if (sign == '*') {this.correct = a * b}
        else if (sign == '/') {this.correct = a / b}
        this.answers = [
            randint(this.correct - 20, this.correct - 1),
            randint(this.correct - 20, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 20),
            randint(this.correct + 1, this.correct + 20),
        ]
        shuffle(this.answers);
    }
    
    display () {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}




// подсчет верных ответов и всех ответов
let current_question
let total_answers_given
let correct_answers_given
current_question = new Question()
current_question.display()

// подсчет правильных\неправильных + до фраз
start_button.addEventListener('click', function() {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    current_question = new Question()
    current_question.display()

    correct_answers_given = 0
    total_answers_given = 0

    // фразы для начала в первый раз
    let quotes = ["Ещё раз?", "Ещё разок?", "И ещё раз?",
                  "Опять?", "Давай опять?", "Попробуй опять!",
                  "Сыграть заново", "Переиграть",
                  "Ты с той ноги встал?", "Не спи", "Ну ты даёшь!",
                  "Хмм", "Неплохо", "Можешь лучше!", "Поднажми!"];
    let index = Math.floor((Math.random() * quotes.length)); 
    document.getElementById('quote').innerHTML = quotes[index];

    setTimeout(function() {
        container_main.style.display = 'none'
        container_start.style.display = 'flex'

        start_button.style.display = 'none'
        start_button_quote.style.display = 'flex'

        container_start_h3.innerHTML = `<h3>Вы дали ${correct_answers_given} правильных ответов из 
        ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`
    }, 5000)

    // подсчет правильных\неправильных + до вторых фраз
    start_button_quote.addEventListener('click', function() {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    current_question = new Question()
    current_question.display()

    correct_answers_given = 0
    total_answers_given = 0

    // фразы для начала во второй раз
    let quotes = ["Ещё раз?", "Ещё разок?", "И ещё раз?",
                  "Опять?", "Давай опять?", "Попробуй опять!",
                  "Сыграть заново", "Переиграть",
                  "Ты с той ноги встал?", "Не спи", "Ну ты даёшь!",
                  "Хмм", "Неплохо", "Можешь лучше!", "Поднажми!"];
    let index = Math.floor((Math.random() * quotes.length)); 
    document.getElementById('quote').innerHTML = quotes[index];

    setTimeout(function() {
        container_main.style.display = 'none'
        container_start.style.display = 'flex'
        start_button_quote.style.display = 'flex'

        container_start_h3.innerHTML = `<h3>Вы дали ${correct_answers_given} правильных ответов из 
        ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`
    }, 5000)
   
})
})

// верно - зеленый + подсчет в верные и тотал, неверно - красный + подсчет в тотал
for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function() {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            correct_answers_given += 1

            answer_buttons[i].style.background = '#a8ef66'
            anime ({
                targets: answer_buttons[i],
                background: 'rgb(236, 236, 236)',
                duration: 500,
                delay: 100,
                easing: 'easeInQuint'
            })
            answer_buttons[i].style.border = '4px solid #a8ef66'
            anime ({
                targets: answer_buttons[i],
                border: '4px solid rgb(137, 201, 238)',
                duration: 500,
                delay: 100,
                easing: 'easeInQuint'
            })

        } else {

            answer_buttons[i].style.background = '#ef6666'
            anime ({
                targets: answer_buttons[i],
                background: 'rgb(236, 236, 236);',
                duration: 500,
                delay: 100,
                easing: 'easeInQuint'
            })
            answer_buttons[i].style.border = '4px solid #ef6666'
            anime ({
                targets: answer_buttons[i],
                border: '4px solid rgb(137, 201, 238)',
                duration: 500,
                delay: 100,
                easing: 'easeInQuint'
            })
            
        }
        total_answers_given += 1

        current_question = new Question()
        current_question.display()
    }
)}
