app.service("soundService", function () {

	var click = new Audio('assets/sound/click.ogg');
	var intro = new Audio('assets/music/we_are_sex_bobomb.ogg');
	
	return {
		click: function () {
			click.play();
		},
		intro: function () {
			intro.play();
		}
	}
});
