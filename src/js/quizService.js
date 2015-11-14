app.service("quizService", function () {

	var path = "";
	var quizId = "";
	var quizUrl = "";
	
	return {
		getPath: function () {
			return path;
		},
		setPath: function (value) {
			if(value.slice(-1) != "/") {
				value += "/";
			}
			path = value;
		},
		getQuizUrl: function () {
			return quizUrl;
		},
		setQuizUrl: function (value) {
			if(value.substring(0,1) == "/") {
				value = value.substring(1,value.length-1);
			}
			quizUrl = value;
		},
		getQuizId: function () {
			return quizId;
		},
		setQuizId: function (value) {
			quizId = value;
		},
		getFullPath: function(){
			return path+quizUrl;
		}
	};
});
