app.controller('nameController', ['$route','$location','$scope','plService','soundService'
,function($route, $location, $scope, plService, soundService ) {

	/* Name creation specific */
	var doc;
	
	$scope.letterlist = [ 'A','B','C','D','E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
	 '1','2','3','4','5','6','7','8','9','0','!','&','#','?'];
	 
	$scope.playername = "";	
	
	var newView = function(view){ 
		soundService.click();
		$location.path(view); 
	};
	
	$scope.updatePlayerName = function(string){ 
		soundService.click();
		$scope.playername += string; 
	};	
	
	$scope.spacer = function(){ 
		soundService.click();
		$scope.playername += " "; 
	};
	
	$scope.backspace = function(){ 
		soundService.click();
		$scope.playername = $scope.playername.substring(0, $scope.playername.length-1);
	};
	
	
	/* Global */
	$scope.changeView = function(){ 
		plService.setName($scope.playername);
		soundService.click();
		$location.path("/quiz"); 
	};
	
	$scope.prepare_and_go = function(){		
		plService.setName("");
		soundService.click();
		$location.path('/name'); 
	};
	
}]);
