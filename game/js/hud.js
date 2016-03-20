// the hud
var hud = {

	score: null,
	score_text: null,

	preload: function() {

	},

	create: function() {
		hud.score = 0;
		hud.score_text = game.add.text(16, 16, '0', {
			fontSize: '32px',
			fill: '#fff',
		});
	},

	update_score: function(delta) {
		hud.score += delta;
		hud.score_text.text = '' + Math.floor(hud.score);
	}
};