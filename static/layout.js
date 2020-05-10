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

const myQuestions = [
	{
		question:
			'If you have a social media profile in which you share photos of yourself and your daily life, you should -',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Keep doing that',
			b: 'Make sure it’s private',
			c: 'Delete it'
		},
		correctAnswer: 'b'
	},
	{
		question: 'If an ad pops up and notifies you about a prize that you have won, you should -',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: "Leave the website and forget the 'jackpot'",
			b: 'Share it with your friends and start planning how to spend the money',
			c: 'Provide your information to receive the money as soon as possible'
		},
		correctAnswer: 'a'
	},
	{
		question: 'When chatting to an unknown person who wants to meet, you should -',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Ask your parents for permission to go out and meet your new friend',
			b: "Make sure that the person definitely won't screw you and not show up",
			c: 'Get an adult to review if the person is real and meet them together with the adult'
		},
		correctAnswer: 'c'
	},
	{
		question:
			'You notice in a website there is a link which offers you to download the latest release of Fortnite 2 for free, what do you do?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: "Get it while it's new",
			b:
				"Check if it's true and if it is - download it from a reliable source by googling it and checking the reviews",
			c: 'Ask your boring parents for advice'
		},
		correctAnswer: 'b'
	},
	{
		question: 'You stumble upon a website which sells Xbox’s and PlayStations for just 10$, what do you do?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Buy one to try out your luck',
			b: 'Buy many to sell them later to your friends and get rich',
			c: 'Buy none and miss out on a great deal'
		},
		correctAnswer: 'c'
	},
	{
		question:
			"When you are out in public and want to check if you enough money to buy a happy meal but don't have a cellular network on your phone, what do you do?",
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Call your lame parents to check it for you but they will get to know how much you have spent',
			b: "Join the 'FREE WIFI HERE' network",
			c: 'Go to a library and do it from the computer there'
		},
		correctAnswer: 'a'
	},
	{
		question: 'Seems like Justin Bieber is trying to add you on Snapchat, what do you do?',
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Add him right away and wait for his selfie',
			b: 'Report him to Snapchat because you hate Justin Bieber',
			c: "Make sure it really is the genuine Justin Bieber's Snapchat username"
		},
		correctAnswer: 'c'
	},
	{
		question: 'When creating a new TikTok account, what do you do?',
		image: '/static/img/meme-password.gif',
		answers: {
			a: "Use a password you usually use, so you don't forget it",
			b: 'Think of a unique password which you will most likely forget in 5 minutes',
			c: "Use '12345678' or 'password' as your password"
		},
		correctAnswer: 'b'
	},
	{
		question:
			"A person is threatening to post an embarrassing picture of (even though you do not remember posting any) you on the internet if you don't pay them, what do you do?",
		image:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.idgesg.net%2Fimages%2Farticle%2F2018%2F02%2Fsecurity_computer_crime_hacker_hacking_thinkstock_608516150-100750000-large.jpg&f=1&nofb=1',
		answers: {
			a: 'Pay them whatever they are demanding',
			b: 'Beg them not to do that',
			c: 'Try to understand from the way they speak if they even have the picture of you'
		},
		correctAnswer: 'c'
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
