app.controller('gameController', ['$route','$location','$interval','$http','$scope','plService','soundService', 'quizService','configService',
 function($route, $location, $interval, $http, $scope, plService,soundService,quizService,configService) {
 
	$("body").removeClass("finish");
	$scope.playername = plService.getName();
	$scope.score = 0;
	$scope.numeroQuestion = 0;
	$scope.nbQuestions = "...";
	$scope.currentQuestion = null;	
	$scope.currentScore;
	$scope.theme = "";
	$scope.highlighted = null;
	var jouer_intro = configService.get('intro','jouer');	
	var url_musique_intro = configService.get('intro','musique');
	if(jouer_intro) {
		soundService.setIntro(url_musique_intro);
	}
	var timer_intro = configService.get('intro','timer_avant_jeu');
	var dieOnErrors = configService.get('finish','mort_si_erreur');
	var dieOnTimeOut = configService.get('timer','mort_si_zero');
	var timerDelay = configService.get('timer','millisecondes_intervalle');
	var maxScore = configService.get('timer','duree');
	var delay = configService.get('finish','duree_avant_suite');
	var faire_noyade =  configService.get('timer','lancer_noyage');
	var timer_noyade =  configService.get('timer','timer_noyade');

	var difficulties = []; //Tri par ordre de difficulté
	var lastAnsweredQuestion = 0;
	var chrono;
	
	// tri par valeur de clef
	var keysort = function(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}
	
	var goStart = function(){
		lastAnsweredQuestion = 0;
		getQuestion();
	}
	
	soundService.intro();
	var url = quizService.getFullPath();
	$http.get(url)
	.success(function(data) {
		
		$scope.theme = data.theme;
		difficulties  = data.questions.sort(keysort('difficulty',true)); //Note : Tri décroissant
		$scope.nbQuestions = difficulties.length;		
		plService.setScore(0);
		plService.setAnswers(0);
		
	})
	.error(function(data,status,error,config){
	   $scope.categories=[];
	   $scope.currentCat = null;
	   $scope.error = "Impossible de charger le quiz";
	});
	$interval(goStart, timer_intro, 1);
	
	var getQuestion = function(){
		$scope.numeroQuestion++;
		$scope.highlighted = null;
		$scope.currentQuestion = difficulties.pop();
		if($scope.currentQuestion == null) {
			$interval(goWin, 1, 1);
		}
		$scope.currentScore = maxScore;
		chrono = $interval(decreaseCurrentScore, timerDelay);
	}
	
	var decreaseCurrentScore = function(){
		
		if($scope.currentScore == 0) {
			$interval.cancel(chrono);
			if(dieOnTimeOut) $interval(goLoose, delay, 1);
		}
		else {
			$scope.currentScore--;
			if(faire_noyade && $scope.currentScore == timer_noyade) soundService.drowning();
		}
	}
	
	$scope.highlight = function(idQuestion, index){
		$("#question .reponseQuiz").removeClass("highlight");
		soundService.click();
		$("#reponse-"+idQuestion+"-"+index).addClass("highlight");
		$scope.highlighted = index;
	}
	
	$scope.answering = function(idQuestion, index, w){
		soundService.stopall();
		if(lastAnsweredQuestion == idQuestion) return;
		lastAnsweredQuestion = idQuestion;
		$interval.cancel(chrono);
		$("#reponse-"+idQuestion+"-"+index).removeClass("highlight");
		if(w == 5) {
			soundService.win();
			$scope.score += $scope.currentScore;
			$("#reponse-"+idQuestion+"-"+index).addClass("green");
			$interval(getQuestion, delay, 1);
		} else {
			soundService.loose();			
			$scope.score -= $scope.currentScore;			
			$("#reponse-"+idQuestion+"-"+index).addClass("red");
			if(dieOnErrors) $interval(goLoose, delay, 1);
			else $interval(getQuestion, delay, 1);
		}
		$scope.highlighted = null;		
	}
	
	var goLoose = function(){
		plService.setScore($scope.score);
		plService.setAnswers($scope.numeroQuestion);
		$location.path("/loose"); 
	}
		
	var goWin = function() {
		plService.setScore($scope.score);
		plService.setAnswers($scope.numeroQuestion);
		$location.path("/win"); 
	}
	
}]);
