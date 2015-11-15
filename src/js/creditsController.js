app.controller('creditsController', ['$route','$location','$scope', function($route, $location, $scope) {
	$scope.recommencer = function(view){ 
		$location.path("/"); 
	}		
}]);
