app.controller('winController', ['$route','$location','$interval','$scope','soundService',
function($route, $location,$interval,$scope,soundService ) {
	soundService.yatta();
	$scope.delay = 7000;
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);



app.controller('looseController', ['$route','$location','$interval','$scope','soundService',
function($route, $location,$interval,$scope,soundService ) {
	soundService.youloose();
	$scope.delay = 7000;
	$("body").addClass("finish");
	$interval(function(){
		$location.path("/credits"); 
	}, $scope.delay,1);
}]);

