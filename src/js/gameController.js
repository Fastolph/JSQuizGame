app.controller('gameController', ['$route','$location','$interval','$http','$scope','plService','soundService', 'quizService',
 function($route, $location, $interval, $http, $scope, plService,soundService,quizService) {
 
	$scope.playername = plService.getName();
	$scope.score = 0;
	$scope.numeroQuestion = 1;
	$scope.nbQuestions = "...";
	$scope.currentQuestion = null;
	$scope.haltOnErrors = true;
	$scope.haltOnNoScore = true;		
	$scope.currentScore;
	$scope.timerDelay = 200;
	$scope.maxScore = 10000;
	$scope.delay = 3000;
	$scope.theme = "";
	
	var difficulties = []; //Tri par ordre de difficulté
	var lastAnsweredQuestion = 0;
	var chrono;
	
	// tri par valeur de clef
	var keysort = function(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}
	
	soundService.intro();
	var url = quizService.getFullPath();
	$http.get(url)
	.success(function(data) {
		$scope.theme = data.theme;
		difficulties  = data.questions.sort(keysort('difficulty',true)); //Note : Tri décroissant
		$scope.nbQuestions = difficulties.length;
		lastAnsweredQuestion = 0;
		getQuestion();
		
	})
	.error(function(data,status,error,config){
	   $scope.categories=[];
	   $scope.currentCat = null;
	   $scope.error = "Impossible de charger le quiz";
	});
	
	var getQuestion = function(){
		$scope.currentQuestion = difficulties.pop();
		if($scope.currentQuestion == null) {
			$interval(goWin, $scope.delay, 1);
		}
		$scope.currentScore = $scope.maxScore;
		chrono = $interval(decreaseCurrentScore, $scope.timerDelay);
	}
	
	var decreaseCurrentScore = function(){
		
		if($scope.currentScore < 1) {
			if($scope.haltOnNoScore) $interval(goLoose, $scope.delay, 1);
		}
		else {
			$scope.currentScore--;
		}
	}
	
	$scope.answering = function(idQuestion, index, w){
		if(lastAnsweredQuestion == idQuestion) return;
		lastAnsweredQuestion = idQuestion;
		$interval.cancel(chrono);
		if(w == 5) {
			soundService.win();
			$scope.score += $scope.currentScore;
			$("#reponse-"+idQuestion+"-"+index).addClass("green");
			$interval(getQuestion, $scope.delay, 1);
		} else {
			soundService.loose();			
			$scope.score -= $scope.currentScore;			
			$("#reponse-"+idQuestion+"-"+index).addClass("red");
			if($scope.haltOnErrors) $interval(goLoose, $scope.delay, 1);
			else $interval(getQuestion, $scope.delay, 1);
		}		
	}
	
	goLoose = function(){
		$location.path("/loose"); 
	}
	
	goWin = function() {
		$location.path("/win"); 
	}
	
}]);
