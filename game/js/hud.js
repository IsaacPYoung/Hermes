// the hud

WebFontConfig = {

    google: {
      families: ['Cinzel']
    }

};

var hud = {

	score: null,
	score_text: null,

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
	}
};