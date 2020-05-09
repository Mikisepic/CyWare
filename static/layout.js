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
			answers.push(
				`<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>
                `
			);
		}

		// add this question and its answers to the output
		output.push(
			`<div class="slide">
				<div class="question"> ${currentQuestion.question} </div>
				<div class="row">
				<div class="col-4"><img class="mb-4" src=${currentQuestion.image}></div>
				<div class="col-4"><div id="answer-list" class="answers"> ${answers.join('')} </div></div>
				<div class="col-4"><img class="mb-4" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCz_XFY6CZ1c%2Fmaxresdefault.jpg&f=1&nofb=1"></div>
				</div>
            </div>
            `
		);
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
	if (numCorrect > 2) {
		// resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
		resultsContainer.innerHTML = `
		<h1>Wow you are very smart! Keep it up</h1>
		`;
	} else {
		resultsContainer.innerHTML = `
		<div class="row mt-5">
			<div class="col-4">
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCz_XFY6CZ1c%2Fmaxresdefault.jpg&f=1&nofb=1">
				<a href="/learn">
					<button style="position: relative; left: 100px;" class="quiz-end-button btn btn-lg" role="button" aria-pressed="true">Go and learn more</button>
				</a>
			</div>
			<div class="col-4">
				<h1 styles="font-size: 50px !important;">YIKES! YOU FAILED!</h1>
				<p class="result-par">This is your result that shows either how good or bad you are.</p>
				<p class="result-par">Either way this paragraph advises you to learn more. #staywoke</p>
			</div>
			<div class="col-4">
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fconfidentqueen.files.wordpress.com%2F2018%2F06%2Fsad-face.png&f=1&nofb=1">
				<a href="/quiz">
					<button style="position: relative; right: 100px;" class="quiz-end-button btn btn-lg" role="button" aria-pressed="true">Take the test again</button>
				</a>
			</div>
		</div>
		`;
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

let percent = 100 / 3;

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
const myQuestions = [
	{
		question: 'Who invented JavaScript?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Douglas Crockford',
			b: 'Sheryl Sandberg',
			c: 'Brendan Eich'
		},
		correctAnswer: 'c'
	},
	{
		question: 'Which one of these is a JavaScript package manager?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Node.js',
			b: 'TypeScript',
			c: 'npm'
		},
		correctAnswer: 'c'
	},
	{
		question: 'Which tool can you use to ensure code quality?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Angular',
			b: 'jQuery',
			c: 'RequireJS',
			d: 'ESLint'
		},
		correctAnswer: 'd'
	}
];

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
