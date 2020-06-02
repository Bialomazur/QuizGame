const startButton = document.getElementById("start-btn");
const displayPoints = document.getElementById("score"); 
const nextButton = document.getElementById("next-btn");
const finalComment = document.getElementById("comment");
const spacing = document.getElementById("spacing");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
let points = 0;


startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})



function startGame(){
    points = 0;
    displayPoints.innerText = "Score: 0";
    displayPoints.classList.remove("hide");
    finalComment.classList.add("hide");
    spacing.classList.add("hide");
    console.log("started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() -.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();

}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct){
            button.dataset.correct = answer.correct;
             
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })

}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    
}

function popup(comment){
    
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct){points++;}
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide");
    }  else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide")
        displayPoints.innerText = "Final Score: " + points;
        if (points > 4){
            finalComment.innerText = "Well done!";
        }
        
        else if (points < 5 && points > 2){
            finalComment.innerText = "Could be better but not too bad!";
        }

        else if (points < 3){
            finalComment.innerText = "You need to read more books!";
        }

        else { finalComment.innerText = "Caught Cheating";}

        finalComment.classList.remove("hide");
        spacing.classList.remove("hide");

    }
    

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        
        element.classList.add("correct");
        
    } else {
        
        element.classList.add("wrong");
        
    }

    displayPoints.innerText = "Score: " + points;
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}


const questions = [
    {
        question: "Who appointed Adolf Hitler 1933 to be chancellor of Germany?",
        answers: [
            {text: "Reichspresident Hindenburg", correct: true},
            {text: "August von Mackensen", correct:false},
            {text: "Heinrich Himmler", correct: false},
            {text: "chancellor von Papen", correct: false}
        ],
        answered: false
    },

    {
        question: "Who became the first german chancellor after World War 2?",
        answers: [
            {text: "Walter Ulbricht", correct: false},
            {text: "Konrad Adenauer", correct: true},
            {text: "Willy Brandt", correct: false},
            {text: "Theodor Höcke", correct: false}
        ],
        answered: false
    },

    {
        question: "when was the end of World War 2?",
        answers: [
            {text: "8th May 1945", correct: false},
            {text: "9th November 1945", correct: false},
            {text: "5th April 1946", correct: false},
            {text: "2nd September 1945", correct: true}
        ],
        answered: false
    },

    {
        question: "Who became the first president of the Russian Federation?",
        answers: [
            {text: "Josef Stalin", correct: false},
            {text: "Vladimir Putin", correct: false},
            {text: "Boris Yeltsin", correct: true},
            {text: "Nicolas II", correct: false}
        ],
        answered: false
    },

    {  question: "Which was the one and only state in the history of mankind to use nuclear weapons?",
       answers: [
        {text: "Soviet Union", correct: false},
        {text: "USA", correct: true},
        {text: "China", correct: false},
        {text: "Nazi Germany", correct: false}
    ],
    answered: false

    }

]