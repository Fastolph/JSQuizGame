app.service("soundService", function () {

	var clickfx = new Audio('assets/sound/click.ogg');
	var loosefx = new Audio('assets/sound/pac-death.ogg');
	var winfx = new Audio('assets/sound/sonic-ring.ogg');
	var introfx = new Audio('assets/music/we_are_sex_bobomb.ogg');
	var drowningfx = new Audio('assets/music/sonic-drowning.ogg');
	
	var yattafx = new Audio('assets/sound/yatta.ogg');
	var youloosefx = new Audio('assets/sound/you-loose.ogg');
	
	return {
		click: function () {
			clickfx.play();
		},
		intro: function () {
			introfx.play();
		},
		win: function () {
			winfx.play();
		},
		loose: function () {
			loosefx.play();
		},
		yatta: function () {
			yattafx.play();
		},
		youloose: function () {
			youloosefx.play();
		},
		drowning: function () {
			drowningfx.play();
		},
		stopall: function(){
			drowningfx.pause();
			drowningfx.currentTime = 0;
			introfx.pause();
			introfx.currentTime = 0;
		}
		
	}
});
