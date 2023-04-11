var points = 0;
let seconds = 60;
var secondsremaining = document.getElementById("demo").innerHTML = seconds;

function startTimer() {

  document.querySelector(".quiz-container").style.display = "flex";
  document.querySelector(".next-button").style.display = "flex";
  document.querySelector(".start-button").style.display = "none";
  var countDownDate = new Date().getTime() + 60000;

  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = seconds; 

    if (distance <= 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "Game Over";
    }
  }, 1000);
}

(function(){
    // Functions
    function startQuiz(){
      // variable to store the HTML output
      var output = [];
  
      // for each question...
      questions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          var answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
          console.log(seconds);
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      var numCorrect = 0;

     
     
  
      // for each question...
      questions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          points += 100;
          console.log(seconds);
          console.log(points);
          document.querySelector(".quizScore").textContent = "Score: " + points;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
          seconds -=10;
         
          console.log(seconds);
          
        }window.localStorage.setItem('quizScore', points);
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function nextQuestion() {
      showSlide(currentSlide + 1);
    }
  
    // Variables
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var questions = [
      {
        question: "Who manufactures the 172?",
        answers: {
          a: "Cessna",
          b: "Piper",
          c: "Beechcraft"
        },
        correctAnswer: "a"
      },
      {
        question: "How many engines does a Baron have?",
        answers: {
          a: "1",
          b: "2",
          c: "4"
        },
        correctAnswer: "b"
      },
      {
        question: "Which of these is a pressurized aircraft?",
        answers: {
          a: "Cessna 182",
          b: "Pilatus PC-12",
          c: "Cirrus SR20",
        },
        correctAnswer: "b"
      }
    ];
  
    // Kick things off
    startQuiz();
  
    // Pagination
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults)
      
      ;
    nextButton.addEventListener("click", nextQuestion);
  })();
  
console.log()

