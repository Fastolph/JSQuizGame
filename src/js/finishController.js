app.controller('winController', ['$route','$location','$interval','$scope','soundService','plService','configService',
function($route, $location,$interval,$scope,soundService,plService,configService ) {
	soundService.yatta();
	var delay = configService.get('finish','duree_ecran_win');
	$scope.score = plService.getScore();
	$scope.nbQuestions = plService.getAnswers()-1;
	$("body").addClass("finish").removeClass("hard");
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
	$("body").addClass("finish").removeClass("hard");
	$interval(function(){
		$location.path("/credits"); 
	}, delay,1);
}]);

