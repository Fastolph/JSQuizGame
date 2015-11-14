app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "src/html/go.html", controller: "nameController"}).
	when("/name", {templateUrl: "src/html/name.html", controller: "nameController"}).
	when("/quiz", {templateUrl: "src/html/quiz.html", controller: "quizController"}).
	when("/game/:id", {templateUrl: "src/html/main.html", controller: "gameController"}).
	otherwise({redirectTo: '/'});
}]);

