// the player
var player = {

	// the representation of the player in the game
	hero: null,

	preload: function() {

		game.load.spritesheet('player', 'assets/player/pheidipp.png', 64, 64);
	},

	create: function() {

		player.hero = game.add.sprite(PlayerOffset, GameHeight - 2 * TileHeight - PlayerHeight, 'player');
		player.hero.animations.add('run');
		player.hero.animations.play('run', 4, true);

		game.physics.arcade.enable(player.hero);
		player.hero.body.gravity.y = 300;

	},

	update: function() {

		if (GameOver)
		{
			player.hero.body.velocity.x = 0;
			player.hero.animations.stop();
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