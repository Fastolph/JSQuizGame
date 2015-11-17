app.controller('winController', ['$route','$location','$interval','$scope','soundService','plService','configService',
function($route, $location,$interval,$scope,soundService,plService,configService ) {
	soundService.yatta();
	var delay = configService.get('finish','duree_ecran_win');
	$scope.score = plService.getScore();
	$scope.nbQuestions = plService.getAnswers();
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, delay,1);
}]);



app.controller('looseController', ['$route','$location','$interval','$scope','soundService','plService','configService',
function($route, $location,$interval,$scope,soundService,plService,configService ) {
	soundService.youloose();
	var delay = configService.get('finish','duree_ecran_loose');
	$scope.score = plService.getScore();
	$scope.nbQuestions = plService.getAnswers();
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, delay,1);
}]);

