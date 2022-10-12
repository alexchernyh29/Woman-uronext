class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.rightAnswers = 0;
		this.count = 0;
		this.activeIndex = 0;

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__counter span");
		this.$answerItem = $(".test__item");
		this.$answer__1 = $(".answer-text");
		this.$answer__2 = $(".test__text__2");
		this.$questionTestImage = $(".test__img-question");

		this.$resultFrameText = $(".result__text");
	}

	init() {
		this.handleEvents();
		this.randomizeQuestions();
		this.renderQuestion();
	}

	randomizeQuestions() {
		const arr = [];
		this.questions.forEach((item, id) => {
			const random = Math.random();
			if (random < 0.5) {
				arr.push([item[0], item[1]]);
			} else {
				arr.push([item[1], item[0]]);
			}
		});
		this.questions = arr;
	}

	handleEvents() {
		$(".test__list").on("click", ".test__item", (e) => {
			const value = $(e.target).data("correct");
			if (value) {
				this.rightAnswers += 1;
			}
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});

		$(".js-reset-test").on("click", () => {
			this.rightAnswers = 0;
			this.activeIndex = 0;
			$("body").removeClass("show-result");
			$(".result").removeClass("is-winner");
			this.renderQuestion();
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTestImage.html(
			`<img src="/images/test-image-${this.activeIndex + 1}.jpg" />`
		);
		$(".test__list").html(
			`<div class="test__item" data-correct="${currentQuestion[0].isCorrect}">${currentQuestion[0].text}</div><div class="test__item" data-correct="${currentQuestion[1].isCorrect}">${currentQuestion[1].text}</div>`
		);
	}

	renderResults() {
		console.log("this.rightAnswers", this.rightAnswers);
		let currentResult = this.results[0];
		if (this.rightAnswers === 3){
			currentResult = this.results[1];
		}
		if (this.rightAnswers > 3){
			currentResult = this.results[2];
		}
		$("body").addClass("show-result");
		$(".result__text").html(currentResult.text);
		$(".result__title span:first-child").html(this.rightAnswers);
		if (this.rightAnswers >= this.questions.length) {
			$(".result").addClass("is-winner");
		}
	}
}

export default Test;
