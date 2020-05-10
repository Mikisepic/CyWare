window.addEventListener('DOMContentLoaded', (event) => {
	$('#button-group a').each((index, $element) => {
		if ($element.href == window.location.href) {
			console.log($element.href);
			$('#button-group a').removeClass('current-page-item');
			$('#button-group a').addClass('current-page-item');
		}
	});
});

$('.card').click(function() {
	let pos = $(this).attr('id');
	let title = $(`#title-${pos}`).text();
	let content = $(`#content-${pos}`).text();
	let image = $(`#image-${pos}`).attr('src');
	if (title && content) {
		$('#learnMoreModalTitle').text(title);
		$('#learnMoreModalContent').text(content);
		$('#learnMoreModalImage').attr('src', image);
	}
});

// quiz
// Functions
function buildQuiz() {
	// variable to store the HTML output
	const output = [];

	// for each question...
	myQuestions.forEach((currentQuestion, questionNumber) => {
		// variable to store the list of possible answers
		const answers = [];

		// and for each available answer...
		for (letter in currentQuestion.answers) {
			// ...add an HTML radio button
			answers.push(answer(questionNumber, letter, currentQuestion.answers[letter]));
		}

		// add this question and its answers to the output
		output.push(slide(currentQuestion, answers));
	});

	// finally combine our output list into one string of HTML and put it on the page
	quizContainer.innerHTML = output.join('');
}

function showResults() {
	move();
	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers');

	submitButton.style.display = 'none';

	// keep track of user's answers
	let numCorrect = 0;

	// for each question...
	myQuestions.forEach((currentQuestion, questionNumber) => {
		// find selected answer
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		// if answer is correct
		if (userAnswer === currentQuestion.correctAnswer) {
			// add to the number of correct answers
			numCorrect++;

			// color the answers green
			answerContainers[questionNumber].style.color = 'lightgreen';
		} else {
			// if answer is wrong or blank
			// color the answers red
			answerContainers[questionNumber].style.color = 'red';
		}
	});

	// show number of correct answers out of total
	document.getElementById('full-quiz').style.display = 'none';
	if (numCorrect > 5) {
		// resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
		resultsContainer.innerHTML = results_success();
	} else {
		resultsContainer.innerHTML = results_fail();
	}
}

function showSlide(n) {
	slides[currentSlide].classList.remove('active-slide');
	slides[n].classList.add('active-slide');
	currentSlide = n;

	if (currentSlide === slides.length - 1) {
		nextButton.style.display = 'none';
		submitButton.style.display = 'inline-block';
	} else {
		nextButton.style.display = 'inline-block';
		submitButton.style.display = 'none';
	}
}

function showNextSlide() {
	showSlide(currentSlide + 1);
	move();
}

function showPreviousSlide() {
	showSlide(currentSlide - 1);
}

let index = 0;

let percent = 100 / 9;

function move() {
	var elem = document.getElementById('myBar');
	var width = index * percent;
	var id = setInterval(frame, 10);
	function frame() {
		if (width < 100) {
			if (width >= index * percent) {
				clearInterval(id);
			} else {
				width++;
				elem.style.width = width + '%';
				// elem.innerHTML = width * 1 + '%';
			}
		} else {
			width = 0;
			index = 0;
		}
	}

	index++;
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
// json file would be better

// didn't have enough time to parse .json file

const myQuestions = data;

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
nextButton.addEventListener('click', showNextSlide);
