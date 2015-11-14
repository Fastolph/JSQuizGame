app.controller('quizController', ['$route','$http','$location','$scope','plService','soundService','quizService',
function($route, $http, $location, $scope, plService, soundService,quizService ) {
	
	$scope.currentCat = null;
	$scope.currentCatText = null;
	$scope.categories=[];
	$scope.error = null;
	$scope.quizInCategory = null;
	$scope.path = "";
	$scope.playername = plService.getName();
	var listeQuiz = null;
	
	
	$http.get('liste_quiz.json')
	.success(function(data) {
		listeQuiz = data.list;
		quizService.setPath(data.path);
		angular.forEach(data.list, function(value, key) {
			  var test = {"key":key,"name":value.name};
			  $scope.categories.push(test);
		});

	})
	.error(function(data,status,error,config){
	   $scope.categories=[];
	   $scope.currentCat = null;
	   $scope.error = "Impossible de charger la liste des quiz";
	});
	
	$scope.chooseCat = function(key){
		$scope.quizInCategory=[];
		$scope.currentCatText = listeQuiz[key].name;
		angular.forEach(listeQuiz[key].content, function(value, key) {
			  var test = {"key":key,"name":value.name};
			  $scope.quizInCategory.push(test);
		});
		soundService.click();
		$scope.currentCat = key;
	}
	
	$scope.loadQuiz = function(id){	
		var url = listeQuiz[$scope.currentCat].content[id].url;
		soundService.click();
		quizService.setQuizId(id);
		quizService.setQuizUrl(url);
		$location.path("/game/"+id); 
	};
	
}]);
