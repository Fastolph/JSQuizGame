app.controller('winController', ['$route','$location','$interval','$scope',
function($route, $location,$interval,$scope ) {
	$scope.delay = 7000;
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);



app.controller('looseController', ['$route','$location','$interval','$scope',
function($route, $location,$interval,$scope ) {
	$scope.delay = 7000;
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);

