app.controller('creditsController', ['$route','$location','$scope', function($route, $location, $scope) {
	$("body").addClass("finish").removeClass("hard");
	;$scope.recommencer = function(view){ 
		$location.path("/"); 
	}		
}]);
