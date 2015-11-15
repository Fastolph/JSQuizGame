app.controller('winController', ['$route','$location','$interval','$scope','soundService','plService',
function($route, $location,$interval,$scope,soundService,plService ) {
	soundService.yatta();
	$scope.delay = 8000;
	$scope.score = plService.getScore();
	$scope.nbQuestions = plService.getAnswers();
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);



app.controller('looseController', ['$route','$location','$interval','$scope','soundService','plService',
function($route, $location,$interval,$scope,soundService,plService ) {
	soundService.youloose();
	$scope.delay = 8000;
	$scope.score = plService.getScore();
	$scope.nbQuestions = plService.getAnswers();
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);

