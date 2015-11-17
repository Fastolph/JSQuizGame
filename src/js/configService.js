app.service("configService",['$http', function ($http) {
	var data = [];
	
	var set = function(rubrique, clef, valeur) {
		if(angular.isUndefined(data[rubrique])) data[rubrique] = [];
		data[rubrique][clef] = valeur;
	};
	
	var parse = function(data){
		angular.forEach(data, function(items, rubrique) {
			angular.forEach(items, function(valeur, clef) {
				set(rubrique, clef, valeur);
			});
		});
	};
	
	return {
		get :function(rubrique, clef) {
			if(angular.isUndefined(data[rubrique])) return false;
			if(angular.isUndefined(data[rubrique][clef])) return false;			
			return data[rubrique][clef];
		},		
				
		load :function(url) {
			$http.get(url)
			.success(function(data) {
				parse(data);				
			})
			.error(function(data,status,error,config){		
			   //TO DO ?
			});
		}
	};
}]);
