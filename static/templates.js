const slide = (the_question, the_answers) => {
	return `<div class="slide">
        <div class="question"> ${the_question.question} </div>
        <div class="row">
        <div class="col-4"><img class="mb-4" src=${the_question.image}></div>
        <div class="col-4"><div id="answer-list" class="answers"> ${the_answers.join('')} </div></div>
        <div class="col-4"><img class="mb-4" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCz_XFY6CZ1c%2Fmaxresdefault.jpg&f=1&nofb=1"></div>
        </div>
    </div>
  `;
};

const answer = (number, letter, text) => {
	return `<label>
      <input type="radio" name="question${number}" value="${letter}">
      ${text}
    </label>`;
};

const results_success = () => {
	return `<h1>Wow you are very smart! Keep it up</h1>`;
};

const results_fail = () => {
	return `
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
};
