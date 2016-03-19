// the player
var player = {

	// the representation of the player in the game
	hero: null,

	preload: function() {

		game.load.image('player', 'assets/player/shyguy.png');
	},

	create: function() {

		player.hero = game.add.sprite(PlayerOffset, GameHeight - 2 * TileHeight - PlayerHeight, 'player');
		
		game.physics.arcade.enable(player.hero);
		player.hero.body.gravity.y = 300;

	},

	update: function() {

		if (GameOver)
		{
			player.hero.body.velocity.x = 0;
		}
		else
		{
			player.hero.body.velocity.x = 300;
		}
	},

	// return the in game representation
	get: function() {
		return player.hero;
	},

	location: function() {
		return player.hero.position;
	}
};