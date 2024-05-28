var questions = [
    {
      question: "Q.1 What is the capital city of India?",
      options: [
        { answer: "Delhi", isCorrect: true },
        { answer: "Mumbai", isCorrect: false },
        { answer: "Kolkata", isCorrect: false }
      ],
      selectedOption: null
    },
    {
      question: "Q.2 Which river is known as the lifeline of India?",
      options: [
        { answer: "Ganges", isCorrect: true },
        { answer: "Yamuna", isCorrect: false },
        { answer: "Brahmaputra", isCorrect: false }
      ],
      selectedOption: null
    },
    {
      question: "Q.3 Which monument is one of the Seven Wonders of the World and is located in India?",
      options: [
        { answer: "Taj Mahal", isCorrect: true },
        { answer: "Eiffel Tower", isCorrect: false },
        { answer: "Great Wall of China", isCorrect: false }
      ],
      selectedOption: null
    },
    {
      question: "Q.4 Which festival is widely celebrated in India and is known as the Festival of Lights?",
      options: [
        { answer: "Diwali", isCorrect: true },
        { answer: "Holi", isCorrect: false },
        { answer: "Navratri", isCorrect: false }
      ],
      selectedOption: null
    }
  ];

  var currentQuestionIndex = 0;
  /*assigning reference to html elements with id specified*/

  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("options");
  var resultElement = document.getElementById("result");
  var progressFillElement = document.getElementById("progress-fill");
  var nextButton = document.getElementById("next-button");
  var retryButton = document.getElementById("retry-button");
  var introContainer = document.querySelector(".intro-container");
  var quizContainer = document.getElementById("quiz-container");
  var resultContainer = document.getElementById("result-container");
  var questionResultsElement = document.getElementById("question-results");
  var totalResultElement = document.getElementById("total-result");
  var accuracyElement = document.getElementById("accuracy");
  var startButton = document.getElementById("start-button");


function displayQuestion() {
  // based on the current index,taking the current question from the 'questions' array 
  var currentQuestion = questions[currentQuestionIndex];

  // to display current question text 
  questionElement.textContent = currentQuestion.question;

  // removing HTML content of the options container (to remove previous options)
  optionsElement.innerHTML = "";

  // Iterating through each option of current question
  currentQuestion.options.forEach(function (option, index) {

    // Creating new 'div' element to represent an option
    var optionElement = document.createElement("div"); 

    // Add the CSS class "option" to the newly created 'div' element
    optionElement.className = "option";

    // Set the text content of the 'div' element to the text of the current option
    optionElement.textContent = option.answer;

    // Add an onclick event to the 'div' element, which will be triggered when the user clicks on the option
    optionElement.onclick = function () {
      // Update the selectedOption property of the current question with the index of the selected option
      currentQuestion.selectedOption = index;
      
      // Check if the selected option is correct and handle the result accordingly
      checkAnswer(option.isCorrect, optionElement);
    };

    // Add the newly created 'div' element (representing the option) to the options container
    optionsElement.appendChild(optionElement);
  });

  // Hide the result element, the "Next" button, and the "Retry Quiz" button
  resultElement.style.display = "none";
  nextButton.style.display = "none";
  retryButton.style.display = "none";
}

function checkAnswer(isCorrect, selectedOption) {
  // Check if the selected option is correct
  if (isCorrect) 
  {
    // If the answer is correct, display "Correct!" in green
    resultElement.textContent = "Correct!";
    resultElement.style.color = "green";
    
    nextButton.style.display = "block"; //show next button
    retryButton.style.display = "none"; //hide retry button
    
    // Set the background color of the selected option to green
    selectedOption.style.backgroundColor = "green";
  } 
  else 
  {
    // If the answer is incorrect, display "Incorrect!" in red
    resultElement.textContent = "Incorrect!";
    resultElement.style.color = "red";
    // Set the background color of the selected option to red
    selectedOption.style.backgroundColor = "red";
    // Show the "Next" button and hide the "Retry Quiz" button
    nextButton.style.display = "block";
    retryButton.style.display = "none";
  }
  // Display the result element
  resultElement.style.display = "block";
  // Update the progress bar to show the user's progress in the quiz
  updateProgress();
  // Disabling options so that the user cannot select another option
  disableOptions();
}

function updateProgress() {
  // Calculating the progress in percentage based on the current question index
  var progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  // Update the width of the progress fill element to show the progress visually
  progressFillElement.style.width = progress + "%";
}

function disableOptions() {
  // Get all elements with the class "option" within the options container
  var options = optionsElement.getElementsByClassName("option");
  // Disable pointer events for all options so that the user cannot select them after answering
  for (var i = 0; i < options.length; i++) {
    options[i].style.pointerEvents = "none";
  }
}

function goToNextQuestion() {
  // Move to the next question by incrementing the currentQuestionIndex
  currentQuestionIndex++;

  // Check if there are more questions left to display
  if (currentQuestionIndex < questions.length) 
  {
    // If there are more questions, display next question
    displayQuestion();
  } 
  else 
  {
    // If all questions are answered, 
    quizContainer.style.display = "none"; //hide
    resultContainer.style.display = "block"; //show results
    // Display quiz results
    showResults();
    // Show "Retry Quiz" button
    retryButton.style.display = "block";
  }
}

function showResults() {
  // Calculate the total number of questions and correct answers
  var totalQuestions = questions.length;
  var correctAnswers = 0;
  // Initialize a variable to store the result text
  var resultText = "";

  // Iterate through each question and check if the answer is correct or incorrect
  questions.forEach(function (question, index) {
    var selectedOptionIndex = question.selectedOption;

    // Add the question text to the result text
    resultText +=  question.question + "</p>";

    // Check if the selected option is not null and if it is the correct answer
    if(selectedOptionIndex !== null && question.options[selectedOptionIndex].isCorrect) 
    {
      correctAnswers++;
      // If the answer is correct, add "Correct" in green to the result text
      resultText += "<p style='color: green'>Correct</p>";
    } 
    else
    {
      // If the answer is incorrect, add "Incorrect" in red to the result text
      resultText += "<p style='color: red'>Incorrect</p>";
    }
  });

  // Calculate the accuracy percentage
  var accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  // Set the result text and quiz accuracy in the respective HTML elements
  questionResultsElement.innerHTML = resultText;
  totalResultElement.textContent = "Correct Answers: " + correctAnswers + "/" + totalQuestions;
  accuracyElement.textContent = "Accuracy: " + accuracy + "%";
}

function resetQuiz() {
  // Resetting currentQuestionIndex
  currentQuestionIndex = 0;

  quizContainer.style.display = "none"; //hide
  resultContainer.style.display = "none"; //hide
  introContainer.style.display = "block"; //display

  // Display the first question
  questionElement.style.display = "block";
  displayQuestion();

  nextButton.style.display = "none"; //hide
  retryButton.style.display = "none"; //hide

  progressFillElement.style.width = "0"; //progress bar reset

  // Reset the selectedOption property for each question to null
  questions.forEach(function (question) {
    question.selectedOption = null;
  });
}

// Add event listeners to 'Start Quiz' button
startButton.addEventListener("click", function () {
  introContainer.style.display = "none";
  displayQuestion();
  quizContainer.style.display = "block";
});
//adding event listener to next button
nextButton.addEventListener("click", goToNextQuestion);
//adding event listener to reset button
retryButton.addEventListener("click", resetQuiz);