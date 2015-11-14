app.controller('gameController', ['$route','$location','$scope','plService','soundService', 'quizService',
 function($route, $location, $scope, plService,soundService,quizService) {
	$scope.playername = plService.getName();
	soundService.intro();
	/* Global */
	$scope.changeView = function(view){ 
		$location.path(view); 
	}	
	
	
}]);
