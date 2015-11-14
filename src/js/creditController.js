app.controller('creditController', ['$route','$location','$scope','plService', function($route, $location, $scope, plService) {
	$scope.playername = plService.getName();

	/* Global */
	$scope.changeView = function(view){ 
		$location.path(view); 
	}	
	
	
}]);
