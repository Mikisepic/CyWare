// const slide = (currentQuestion) => {
// 	`<div class="slide">
//         <div class="question"> ${currentQuestion.question} </div>
//         <div class="row">
//         <div class="col-4"><img class="mb-4" src=${currentQuestion.image}></div>
//         <div class="col-4"><div id="answer-list" class="answers"> ${answers.join('')} </div></div>
//         <div class="col-4"><img class="mb-4" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCz_XFY6CZ1c%2Fmaxresdefault.jpg&f=1&nofb=1"></div>
//         </div>
//     </div>
//     `;
// };

const answer = (number, letter, text) => {
	return `<label>
      <input type="radio" name="question${number}" value="${letter}">
      ${text}
    </label>`;
};
