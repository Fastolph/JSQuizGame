app.service("plService", function () {
	var name = "";
	var score = 0;
	var answers = 0;
	return {
		getName: function () {
			return name;
		},
		setName: function (value) {
			name = value;
		},
		getScore: function () {
			return score;
		},
		setScore: function (value) {
			score = value;
		},
		getAnswers: function () {
			return answers;
		},
		setAnswers: function (value) {
			answers = value;
		}
	};
});
