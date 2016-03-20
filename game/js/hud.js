// the hud

WebFontConfig = {

    google: {
      families: ['Cinzel']
    }

};

var hud = {

	score: null,
	score_text: null,

	game_over_text: null,

	preload: function() {
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},

	create: function() {
		hud.score = 0;
		hud.score_text = game.add.text(16, 16, '0', {
			font: 'Cinzel',
			fontSize: '48px',
			fill: '#fff',
		});
	},

	update_score: function(delta) {
		hud.score += delta;
		hud.score_text.text = '' + Math.floor(hud.score);
	},

	game_over: function() {
		hud.game_over_text = game.add.text(GameWidth / 2 - 128, GameHeight / 2 - 128, 'Dead', {
			font: 'Cinzel',
			fontSize: '64px',
			fill: '#fff',
		});
	},
};