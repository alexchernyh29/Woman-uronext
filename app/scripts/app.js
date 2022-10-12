import $ from "jquery";
import WOW from "wowjs";
import DATA from "./data";
import Test from "./test";

$(() => {
	const test = new Test(DATA);
	test.init();

	$("#moveTo").on("click", (e) => {
		e.preventDefault();
		$("html, body").animate(
			{
				scrollTop: $(".test").offset().top,
			},
			500
		);
	});

	$(".result__btn-send").on("click", () => {
		const isAgree = $(".result__checkbox").is(":checked");
		const email = $(".result__email").val();
		if (!isAgree) {
			$(".result__provision")
				.fadeOut(300)
				.fadeIn(300)
				.fadeOut(300)
				.fadeIn(300);
		}
		if (!email) {
			$(".result__email")
				.fadeOut(300)
				.fadeIn(300)
				.fadeOut(300)
				.fadeIn(300);
		}
		if (email && isAgree) {
			$.post("/save_email/", { email }).done((data) => {
				const { error_num, error } = data;
				console.log("data", data);
				$(".result").addClass("show-popup");
				if (!error_num) {
					$("result__popup-text").text(
						"Спасибо! Ваш email был сохранен."
					);
				} else {
					$("result__popup-text").html(error);
				}
			});
		}
	});

	function onlyLatinCharacters(str) {
		return /^[a-zA-Z@.0-9]+$/.test(str);
	}

	$(".result__email").on("keydown", (event) => {
		const { key } = event;
		if (!onlyLatinCharacters(key)) {
			return false;
		}
	});

	$(".result__close").on("click", () => {
		$(".result").removeClass("show-popup");
	});

	const wow = new WOW.WOW({
		boxClass: "wow",
		live: false,
	});

	wow.init();

	$(".presentation").trigger("click");
});
